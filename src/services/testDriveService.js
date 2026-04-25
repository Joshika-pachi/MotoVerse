import { supabase } from "./supabaseClient"

// ─────────────────────────────────────────────────────────────
// Helpers — manual hydration (no FK joins needed)
// ─────────────────────────────────────────────────────────────

async function hydrateDrives(drives) {
  if (!drives || drives.length === 0) return []

  // Collect unique car_ids and user_ids
  const carIds  = [...new Set(drives.map(d => d.car_id).filter(Boolean))]
  const userIds = [...new Set(drives.map(d => d.user_id).filter(Boolean))]

  // Fetch cars
  let carMap = {}
  if (carIds.length > 0) {
    const { data: cars } = await supabase
      .from("cars")
      .select("id, brand, model, image, price")
      .in("id", carIds)
    ;(cars || []).forEach(c => { carMap[c.id] = c })
  }

  // Fetch users
  let userMap = {}
  if (userIds.length > 0) {
    const { data: users } = await supabase
      .from("users")
      .select("id, email, full_name")
      .in("id", userIds)
    ;(users || []).forEach(u => { userMap[u.id] = u })
  }

  // Merge
  return drives.map(d => ({
    ...d,
    cars:  d.car_id  ? (carMap[d.car_id]   || null) : null,
    users: d.user_id ? (userMap[d.user_id] || null) : null,
  }))
}

// ─────────────────────────────────────────────────────────────
// Book a test drive
// ─────────────────────────────────────────────────────────────
export async function bookTestDrive(userId, carId, date) {
  const { data, error } = await supabase
    .from("test_drives")
    .insert([{ user_id: userId, car_id: carId, date, status: "pending" }])
    .select()
    .single()
  return { data, error }
}

// ─────────────────────────────────────────────────────────────
// Check if user already has an active booking for this car
// ─────────────────────────────────────────────────────────────
export async function getExistingBooking(userId, carId) {
  if (!userId) return null
  const { data } = await supabase
    .from("test_drives")
    .select("id, status")
    .eq("user_id", userId)
    .eq("car_id", carId)
    .in("status", ["pending", "confirmed"])
    .maybeSingle()
  return data
}

// ─────────────────────────────────────────────────────────────
// Customer: get my own test drives with car info
// ─────────────────────────────────────────────────────────────
export async function getMyTestDrives(userId) {
  const { data: drives, error } = await supabase
    .from("test_drives")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })

  if (error) return { data: [], error }
  const data = await hydrateDrives(drives)
  return { data, error: null }
}

// ─────────────────────────────────────────────────────────────
// Admin: get ALL test drives with car + user info
// ─────────────────────────────────────────────────────────────
export async function getAllTestDrives() {
  const { data: drives, error } = await supabase
    .from("test_drives")
    .select("*")
    .order("date", { ascending: false })

  if (error) return { data: [], error }
  const data = await hydrateDrives(drives)
  return { data, error: null }
}

// ─────────────────────────────────────────────────────────────
// Dealer: get test drives for a set of car IDs
// ─────────────────────────────────────────────────────────────
export async function getTestDrivesForDealer(dealerCarIds) {
  if (!dealerCarIds || dealerCarIds.length === 0) return { data: [] }

  const { data: drives, error } = await supabase
    .from("test_drives")
    .select("*")
    .in("car_id", dealerCarIds)
    .order("date", { ascending: false })

  if (error) return { data: [], error }
  const data = await hydrateDrives(drives)
  return { data, error: null }
}

// ─────────────────────────────────────────────────────────────
// Update status — confirm or cancel
// ─────────────────────────────────────────────────────────────
export async function updateTestDriveStatus(id, status) {
  const { data, error } = await supabase
    .from("test_drives")
    .update({ status })
    .eq("id", id)
    .select()
    .single()
  return { data, error }
}

// ─────────────────────────────────────────────────────────────
// Customer cancels own booking
// ─────────────────────────────────────────────────────────────
export async function cancelMyTestDrive(id) {
  const { error } = await supabase
    .from("test_drives")
    .update({ status: "cancelled" })
    .eq("id", id)
  return { error }
}
