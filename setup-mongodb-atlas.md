# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new project (e.g., "SCNBCP-Project")

## Step 2: Create a Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (Free tier)
3. Select a cloud provider and region (closest to you)
4. Name your cluster (e.g., "scnbcp-cluster")
5. Click "Create Cluster"

## Step 3: Create Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `scnbcp`
5. Password: `scnbcp123` (or generate a secure password)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

## Step 4: Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
4. Or add your specific IP address
5. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" and version "4.1 or later"
5. Copy the connection string
6. Replace `<password>` with your actual password

## Step 6: Update .env File
Replace the MONGODB_URI in your .env file with your actual connection string:

```
MONGODB_URI=mongodb+srv://scnbcp:<password>@scnbcp-cluster.xxxxx.mongodb.net/scnbcp?retryWrites=true&w=majority
```

## Example Connection String Format:
```
mongodb+srv://scnbcp:scnbcp123@scnbcp-cluster.abc12.mongodb.net/scnbcp?retryWrites=true&w=majority
```

## Test Connection
After updating the .env file, run:
```bash
node test-atlas-connection.js
```

If successful, seed the database:
```bash
node seed.js
```