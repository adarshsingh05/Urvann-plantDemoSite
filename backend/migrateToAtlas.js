const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './config.env' });

// Local MongoDB connection (source)
const LOCAL_MONGODB_URI = 'mongodb://localhost:27017/urvan-plant-store';

// MongoDB Atlas connection (destination)
const ATLAS_MONGODB_URI = process.env.MONGODB_URI;

async function migrateData() {
  let localClient, atlasClient;
  
  try {
    console.log('🚀 Starting database migration to MongoDB Atlas...');
    
    // Connect to local MongoDB
    console.log('📡 Connecting to local MongoDB...');
    localClient = new MongoClient(LOCAL_MONGODB_URI);
    await localClient.connect();
    console.log('✅ Connected to local MongoDB');
    
    // Connect to MongoDB Atlas
    console.log('☁️ Connecting to MongoDB Atlas...');
    atlasClient = new MongoClient(ATLAS_MONGODB_URI);
    await atlasClient.connect();
    console.log('✅ Connected to MongoDB Atlas');
    
    const localDb = localClient.db();
    const atlasDb = atlasClient.db();
    
    // Get all collections from local database
    const collections = await localDb.listCollections().toArray();
    console.log(`📋 Found ${collections.length} collections to migrate`);
    
    // Migrate each collection
    for (const collection of collections) {
      const collectionName = collection.name;
      console.log(`🔄 Migrating collection: ${collectionName}`);
      
      // Get all documents from local collection
      const documents = await localDb.collection(collectionName).find({}).toArray();
      console.log(`   Found ${documents.length} documents`);
      
      if (documents.length > 0) {
        // Insert documents into Atlas collection
        const result = await atlasDb.collection(collectionName).insertMany(documents);
        console.log(`   ✅ Successfully migrated ${result.insertedCount} documents`);
      } else {
        console.log(`   ℹ️ No documents to migrate for ${collectionName}`);
      }
    }
    
    console.log('🎉 Migration completed successfully!');
    
    // Verify migration
    console.log('\n🔍 Verifying migration...');
    for (const collection of collections) {
      const localCount = await localDb.collection(collection.name).countDocuments();
      const atlasCount = await atlasDb.collection(collection.name).countDocuments();
      console.log(`   ${collection.name}: ${localCount} → ${atlasCount} documents`);
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    // Close connections
    if (localClient) {
      await localClient.close();
      console.log('🔌 Closed local MongoDB connection');
    }
    if (atlasClient) {
      await atlasClient.close();
      console.log('🔌 Closed MongoDB Atlas connection');
    }
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateData()
    .then(() => {
      console.log('✨ Migration script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateData };
