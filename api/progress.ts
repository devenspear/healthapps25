import type { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeDatabase, getUserProgress, updateUserProgress, getJournalEntries, saveJournalEntry, getBiofeedbackEntries, saveBiofeedbackEntry, getDayEntries, saveDayEntry } from '../src/lib/database';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Ensure DB is ready
  await initializeDatabase();

  const method = req.method;
  const userId = (req.query.userId as string) || (req.body && req.body.userId);

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    switch (method) {
      case 'GET': {
        const userProgressRow = await getUserProgress(userId);
        const journalRows = await getJournalEntries(userId);
        const bioRows = await getBiofeedbackEntries(userId);
        const dayRows = await getDayEntries(userId);

        // Transform rows into front-end shape
        const progress = {
          currentDay: userProgressRow?.current_day || 1,
          startDate: userProgressRow?.start_date || new Date().toISOString().split('T')[0],
          completedDays: userProgressRow?.completed_days || [],
          journalEntries: journalRows.reduce((acc: any, j: any) => {
            acc[j.date] = {
              date: j.date,
              physical: j.physical,
              emotional: j.emotional,
              cognitive: j.cognitive,
              spiritual: j.spiritual,
              dieOffSymptoms: j.die_off_symptoms,
              dieOffIntensity: j.die_off_intensity,
              dieOffMitigation: j.die_off_mitigation,
              meals: j.meals
            };
            return acc;
          }, {}),
          biofeedbackEntries: bioRows.reduce((acc: any, b: any) => {
            acc[b.date] = {
              date: b.date,
              hrv: b.hrv,
              restingHR: b.resting_hr,
              tempDelta: b.temp_delta,
              vo2Max: b.vo2_max,
              activeCals: b.active_cals,
              deepSleep: b.deep_sleep,
              remSleep: b.rem_sleep,
              brainFog: b.brain_fog,
              mood: b.mood,
              libido: b.libido,
              energy: b.energy,
              notes: b.notes
            };
            return acc;
          }, {}),
          dayEntries: dayRows.reduce((acc: any, d: any) => {
            acc[d.day] = {
              day: d.day,
              completed: d.completed,
              dieOffScore: d.die_off_score,
              tasks: d.tasks_completed || []
            };
            return acc;
          }, {})
        };

        return res.status(200).json({ progress });
      }

      case 'POST': {
        const { progress } = req.body as any;
        if (!progress) {
          return res.status(400).json({ error: 'Missing progress object' });
        }

        // Update high-level progress row
        await updateUserProgress(userId, {
          startDate: progress.startDate,
          currentDay: progress.currentDay,
          completedDays: progress.completedDays
        });

        // Persist journal entries
        if (progress.journalEntries) {
          for (const entry of Object.values(progress.journalEntries)) {
            await saveJournalEntry(userId, entry);
          }
        }

        // Persist biofeedback entries
        if (progress.biofeedbackEntries) {
          for (const entry of Object.values(progress.biofeedbackEntries)) {
            await saveBiofeedbackEntry(userId, entry);
          }
        }

        // Persist day entries
        if (progress.dayEntries) {
          for (const entry of Object.values(progress.dayEntries)) {
            await saveDayEntry(userId, entry);
          }
        }

        return res.status(200).json({ ok: true });
      }

      default:
        res.setHeader('Allow', 'GET, POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('progress endpoint error', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 