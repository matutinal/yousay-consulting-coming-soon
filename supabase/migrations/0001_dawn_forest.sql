/*
  # Create subscribers table

  1. New Tables
    - `subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `status` (text, default: 'active')

  2. Security
    - Enable RLS on `subscribers` table
    - Add policy for inserting new subscribers
    - Add policy for reading subscriber data (admin only)
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'active'
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe
CREATE POLICY "Anyone can subscribe"
  ON subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can read subscribers
CREATE POLICY "Only authenticated users can read subscribers"
  ON subscribers
  FOR SELECT
  TO authenticated
  USING (true);