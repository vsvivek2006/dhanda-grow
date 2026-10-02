import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

// Load .env.local if not already in process.env
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...values] = trimmed.split("=");
      if (key && values.length) {
        process.env[key.trim()] = values.join("=").trim();
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Parse command line arguments
const args = process.argv.slice(2);
let email = "";
let password = "";

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--email" && args[i + 1]) {
    email = args[i + 1];
    i++;
  } else if (args[i] === "--password" && args[i + 1]) {
    password = args[i + 1];
    i++;
  }
}

if (!email || !password) {
  console.error("Usage: node scripts/create-admin.mjs --email <admin_email> --password <admin_password>");
  process.exit(1);
}

async function registerAdmin() {
  console.log(`Connecting to Supabase at ${supabaseUrl}...`);
  console.log(`Registering admin user: ${email}...`);

  // Check if user already exists
  const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error("❌ Error listing users:", listError.message);
    process.exit(1);
  }

  const existingUser = usersData.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

  if (existingUser) {
    console.log(`User ${email} already exists (ID: ${existingUser.id}). Updating password and confirming email...`);
    const { data: updated, error: updateError } = await supabase.auth.admin.updateUserById(
      existingUser.id,
      {
        password: password,
        email_confirm: true,
        user_metadata: { role: "admin", name: "Dhanda Grow Admin" },
      }
    );

    if (updateError) {
      console.error("❌ Error updating admin user:", updateError.message);
      process.exit(1);
    }

    console.log("✅ Admin user successfully updated and verified!");
    console.log(`Email: ${email}`);
    console.log(`User ID: ${updated.user.id}`);
  } else {
    const { data: created, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role: "admin", name: "Dhanda Grow Admin" },
    });

    if (createError) {
      console.error("❌ Error creating admin user:", createError.message);
      process.exit(1);
    }

    console.log("✅ Admin user successfully created directly in DB!");
    console.log(`Email: ${email}`);
    console.log(`User ID: ${created.user.id}`);
  }
}

registerAdmin();
