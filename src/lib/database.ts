import { createPool } from '@vercel/postgres';

// Create database connection using HEALTH_DATABASE_URL to avoid conflicts
const connectionString = process.env.HEALTH_DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('Missing database connection string: HEALTH_DATABASE_URL or POSTGRES_URL required');
}

const pool = createPool({ connectionString });
const sql = pool.sql;

// Database initialization - create tables if they don't exist
export async function initializeDatabase() {
  try {
    // Users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        clerk_user_id TEXT UNIQUE NOT NULL,
        email TEXT,
        first_name TEXT,
        last_name TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // User progress table
    await sql`
      CREATE TABLE IF NOT EXISTS user_progress (
        id SERIAL PRIMARY KEY,
        user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        start_date DATE NOT NULL,
        current_day INTEGER DEFAULT 1,
        completed_days INTEGER[] DEFAULT '{}',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Biofeedback entries table
    await sql`
      CREATE TABLE IF NOT EXISTS biofeedback_entries (
        id SERIAL PRIMARY KEY,
        user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        hrv DECIMAL,
        resting_hr INTEGER,
        temp_delta DECIMAL,
        vo2_max DECIMAL,
        active_cals INTEGER,
        deep_sleep DECIMAL,
        rem_sleep DECIMAL,
        brain_fog INTEGER,
        mood INTEGER,
        libido INTEGER,
        energy INTEGER,
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, date)
      )
    `;

    // Journal entries table
    await sql`
      CREATE TABLE IF NOT EXISTS journal_entries (
        id SERIAL PRIMARY KEY,
        user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        physical TEXT,
        emotional TEXT,
        cognitive TEXT,
        spiritual TEXT,
        die_off_symptoms TEXT,
        die_off_intensity INTEGER,
        die_off_mitigation TEXT,
        meals JSONB DEFAULT '[]',
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, date)
      )
    `;

    // Day entries table (cleanse calendar)
    await sql`
      CREATE TABLE IF NOT EXISTS day_entries (
        id SERIAL PRIMARY KEY,
        user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        day INTEGER NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        die_off_score INTEGER,
        tasks_completed JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, day)
      )
    `;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// User operations
export async function createUser(clerkUserId: string, email?: string, firstName?: string | undefined, lastName?: string | undefined) {
  try {
    const result = await sql`
      INSERT INTO users (id, clerk_user_id, email, first_name, last_name)
      VALUES (${clerkUserId}, ${clerkUserId}, ${email}, ${firstName}, ${lastName})
      ON CONFLICT (clerk_user_id) DO UPDATE SET
        email = EXCLUDED.email,
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        updated_at = NOW()
      RETURNING *
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getUserProgress(userId: string) {
  try {
    const result = await sql`
      SELECT * FROM user_progress WHERE user_id = ${userId} LIMIT 1
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error getting user progress:', error);
    throw error;
  }
}

export async function updateUserProgress(userId: string, progressData: any) {
  try {
    const result = await sql`
      INSERT INTO user_progress (user_id, start_date, current_day, completed_days)
      VALUES (${userId}, ${progressData.startDate}, ${progressData.currentDay}, ${JSON.stringify(progressData.completedDays)})
      ON CONFLICT (user_id) DO UPDATE SET
        current_day = EXCLUDED.current_day,
        completed_days = EXCLUDED.completed_days,
        updated_at = NOW()
      RETURNING *
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error updating user progress:', error);
    throw error;
  }
}

export async function getBiofeedbackEntries(userId: string) {
  try {
    const result = await sql`
      SELECT * FROM biofeedback_entries WHERE user_id = ${userId} ORDER BY date DESC
    `;
    return result.rows;
  } catch (error) {
    console.error('Error getting biofeedback entries:', error);
    throw error;
  }
}

export async function saveBiofeedbackEntry(userId: string, entryData: any) {
  try {
    const result = await sql`
      INSERT INTO biofeedback_entries (
        user_id, date, hrv, resting_hr, temp_delta, vo2_max, active_cals,
        deep_sleep, rem_sleep, brain_fog, mood, libido, energy, notes
      ) VALUES (
        ${userId}, ${entryData.date}, ${entryData.hrv}, ${entryData.restingHR},
        ${entryData.tempDelta}, ${entryData.vo2Max}, ${entryData.activeCals},
        ${entryData.deepSleep}, ${entryData.remSleep}, ${entryData.brainFog},
        ${entryData.mood}, ${entryData.libido}, ${entryData.energy}, ${entryData.notes}
      )
      ON CONFLICT (user_id, date) DO UPDATE SET
        hrv = EXCLUDED.hrv,
        resting_hr = EXCLUDED.resting_hr,
        temp_delta = EXCLUDED.temp_delta,
        vo2_max = EXCLUDED.vo2_max,
        active_cals = EXCLUDED.active_cals,
        deep_sleep = EXCLUDED.deep_sleep,
        rem_sleep = EXCLUDED.rem_sleep,
        brain_fog = EXCLUDED.brain_fog,
        mood = EXCLUDED.mood,
        libido = EXCLUDED.libido,
        energy = EXCLUDED.energy,
        notes = EXCLUDED.notes
      RETURNING *
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error saving biofeedback entry:', error);
    throw error;
  }
}

export async function getJournalEntries(userId: string) {
  try {
    const result = await sql`
      SELECT * FROM journal_entries WHERE user_id = ${userId} ORDER BY date DESC
    `;
    return result.rows;
  } catch (error) {
    console.error('Error getting journal entries:', error);
    throw error;
  }
}

export async function saveJournalEntry(userId: string, entryData: any) {
  try {
    const result = await sql`
      INSERT INTO journal_entries (
        user_id, date, physical, emotional, cognitive, spiritual,
        die_off_symptoms, die_off_intensity, die_off_mitigation, meals
      ) VALUES (
        ${userId}, ${entryData.date}, ${entryData.physical}, ${entryData.emotional},
        ${entryData.cognitive}, ${entryData.spiritual}, ${entryData.dieOffSymptoms},
        ${entryData.dieOffIntensity}, ${entryData.dieOffMitigation}, ${JSON.stringify(entryData.meals)}
      )
      ON CONFLICT (user_id, date) DO UPDATE SET
        physical = EXCLUDED.physical,
        emotional = EXCLUDED.emotional,
        cognitive = EXCLUDED.cognitive,
        spiritual = EXCLUDED.spiritual,
        die_off_symptoms = EXCLUDED.die_off_symptoms,
        die_off_intensity = EXCLUDED.die_off_intensity,
        die_off_mitigation = EXCLUDED.die_off_mitigation,
        meals = EXCLUDED.meals
      RETURNING *
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error saving journal entry:', error);
    throw error;
  }
} 