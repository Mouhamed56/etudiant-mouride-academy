import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MODULES } from '@/data/modules'
import { QUIZZES } from '@/data/quizzes'

export function useModules() {
  const [modules, setModules] = useState(MODULES as any[])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data } = await (supabase as any)
          .from('custom_modules')
          .select('*')
          .order('updated_at', { ascending: false })

        if (data && data.length > 0) {
          const modMap: Record<string, any> = {}
          data.forEach((cm: { id: string; data: any }) => { modMap[cm.id] = cm.data })
          const localIds = MODULES.map(m => m.id)
          const newIds = Object.keys(modMap).filter((id: string) => !localIds.includes(id))
          const merged = [
            ...MODULES.map(m => modMap[m.id] ? modMap[m.id] : m),
            ...newIds.map((id: string) => modMap[id])
          ]
          setModules(merged)
        }
      } catch (e) {
        console.error('useModules error:', e)
      }
      setLoading(false)
    }
    load()
  }, [])

  return { modules, loading }
}

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState(QUIZZES as any[])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data } = await (supabase as any)
          .from('custom_quizzes')
          .select('*')
          .order('updated_at', { ascending: false })

        if (data && data.length > 0) {
          const quizMap: Record<string, any> = {}
          data.forEach((cq: { id: string; data: any }) => { quizMap[cq.id] = cq.data })
          const localIds = QUIZZES.map(q => q.id)
          const newIds = Object.keys(quizMap).filter((id: string) => !localIds.includes(id))
          const merged = [
            ...QUIZZES.map(q => quizMap[q.id] ? quizMap[q.id] : q),
            ...newIds.map((id: string) => quizMap[id])
          ]
          setQuizzes(merged)
        }
      } catch (e) {
        console.error('useQuizzes error:', e)
      }
      setLoading(false)
    }
    load()
  }, [])

  return { quizzes, loading }
}