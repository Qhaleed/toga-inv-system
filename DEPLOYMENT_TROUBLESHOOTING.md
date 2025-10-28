# Deployment Troubleshooting Guide

## Issue: Backend Deployment to Vercel Failed Initially

### Timeline of Issues and Solutions

---

## Problem 1: Function Returned Source Code Instead of Executing

**Symptom:**

- Accessing `https://toga-backend.vercel.app` returned the entire `server.js` file as plain text
- Routes returned HTTP 405 (Method Not Allowed)

**Root Cause:**

- Initial `vercel.json` configuration used both `routes` and `rewrites` properties
- Vercel requires using ONLY the newer configuration properties (`rewrites`, `headers`) without `routes`
- The serverless function wasn't being executed properly

**Solution:**

1. Removed conflicting `routes` property from `vercel.json`
2. Created `api/index.js` as the serverless function entry point
3. Used proper Vercel serverless configuration:

```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api"
    }
  ],
  "headers": [...]
}
```

---

## Problem 2: FUNCTION_INVOCATION_FAILED Error

**Symptom:**

- After fixing the configuration, got "A server error has occurred - FUNCTION_INVOCATION_FAILED"
- Function crashed immediately on invocation

**Root Cause:**

- `SUPABASE_URL` environment variable was NOT set in Vercel Production environment
- Only `SUPABASE_ANON_KEY` was present
- Database connection initialization failed during module load

**How This Happened:**

- When environment variables were initially added to Vercel, `SUPABASE_URL` might have been added to Development/Preview only, not Production
- Or it was deleted/corrupted at some point

**Solution:**

1. Removed and re-added `SUPABASE_URL` to Production environment:

```bash
vercel env rm SUPABASE_URL production -y
echo "https://vyizxirogpjwbicravjd.supabase.co" | vercel env add SUPABASE_URL production
```

2. Made `dotenv` loading conditional (only in development):

```javascript
// server.js and db.js
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
```

3. Made database test connection conditional:

```javascript
// db.js - only test in development
if (process.env.NODE_ENV !== "production" && process.env.VERCEL !== "1") {
  testConnection();
}
```

---

## Problem 3: CORS Errors (Resolved Earlier)

**Previous Issues:**

- Frontend couldn't connect to backend due to CORS
- Multiple CORS configurations conflicted with each other

**Final Solution:**

- Manual CORS headers in Express middleware
- Additional CORS headers in `vercel.json` for Vercel-level handling
- All headers properly configured for `*` origin

---

## Final Working Configuration

### Backend Structure

```
backend/
├── api/
│   └── index.js          # Vercel serverless entry point
├── database/
│   └── db.js             # Conditional dotenv, conditional test connection
├── routes/
├── server.js             # Conditional dotenv, exports app
└── vercel.json           # Proper rewrites + headers configuration
```

### Environment Variables Required in Vercel Production

- ✅ `SUPABASE_URL` - PostgreSQL database URL
- ✅ `SUPABASE_ANON_KEY` - Database authentication key
- ✅ `SECRET_KEY` - JWT token secret
- ✅ `NODE_ENV` - Set to "production"

### Verification

```bash
# Test if environment variables are loaded
curl https://toga-backend.vercel.app/

# Should return:
# {"status":"success","message":"Backend is running","timestamp":"..."}

# Test login endpoint (should return 401 for invalid credentials)
curl -X POST https://toga-backend.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

---

## Key Lessons

1. **Vercel Configuration:** Cannot mix old `routes` with new `rewrites`/`headers` properties
2. **Environment Variables:** MUST be set for Production environment explicitly, not just Development
3. **Serverless Best Practices:**
   - Don't load dotenv in production (Vercel provides env vars directly)
   - Don't run connection tests during module initialization in serverless
   - Export Express app as `module.exports = app` for Vercel compatibility
4. **Debugging:** Always verify environment variables are actually loaded in production using test endpoints

---

## Current Status

✅ **Backend deployed successfully at:** https://toga-backend.vercel.app  
✅ **Frontend deployed successfully at:** https://toga-inventory.vercel.app  
✅ **All CORS headers working**  
✅ **Database connection working**  
✅ **API endpoints responding correctly**
