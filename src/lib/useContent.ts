import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MODULES } from '@/data/modules'
import { QUIZZES } from '@/data/quizzes'

export function useModules() {
  const [modules, setModules] = useState(MODULES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('custom_modules')
        .select('*')
        .order('updated_at', { ascending: false })

      if (data && data.length > 0) {
        const modMap: Record<string, any> = {}
        data.forEach(cm => { modMap[cm.id] = cm.data })
        const localIds = MODULES.map(m => m.id)
        const newIds = Object.keys(modMap).filter(id => !localIds.includes(id))
        const merged = [
          ...MODULES.map(m => modMap[m.id] ? modMap[m.id] : m),
          ...newIds.map(id => modMap[id])
        ]
        setModules(merged as any)
      }
      setLoading(false)
    }
    load()
  }, [])

  return { modules, loading }
}

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState(QUIZZES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('custom_quizzes')
        .select('*')
        .order('updated_at', { ascending: false })

      if (data && data.length > 0) {
        const quizMap: Record<string, any> = {}
        data.forEach(cq => { quizMap[cq.id] = cq.data })
        const localIds = QUIZZES.map(q => q.id)
        const newIds = Object.keys(quizMap).filter(id => !localIds.includes(id))
        const merged = [
          ...QUIZZES.map(q => quizMap[q.id] ? quizMap[q.id] : q),
          ...newIds.map(id => quizMap[id])
        ]
        setQuizzes(merged as any)
      }
      setLoading(false)
    }
    load()
  }, [])

  return { quizzes, loading }
}