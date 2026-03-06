const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// ⚠️ PREDEFINED ADMIN CREDENTIALS - DO NOT CHANGE
const ADMIN_EMAIL = 'admin@newspaper.com';
const ADMIN_PASSWORD = 'Admin@123456';

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    
    if (!existingAdmin) {
      // Create admin user
      const admin = await User.create({
        name: 'System Admin',
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: 'admin'
      });
      
      console.log('\n🎉 Admin user created successfully!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 Email:', ADMIN_EMAIL);
      console.log('🔑 Password:', ADMIN_PASSWORD);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    } else {
      console.log('\nℹ️  Admin user already exists');
      console.log('📧 Email:', ADMIN_EMAIL);
      console.log('🔑 Password:', ADMIN_PASSWORD, '\n');
    }

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
    process.exit(1);
  }
}

seedAdmin();
