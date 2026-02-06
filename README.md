# financial-health-assessment

## Deploy

### Backend (Render)
1. Push this repo to GitHub.
2. In Render: New → Web Service → connect the repo.
3. Build Command: `pip install -r backend/requirements.txt`
4. Start Command: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
5. Set env vars:
   - `OPENAI_API_KEY` (required)
   - `DATABASE_URL` (optional)

You can also use the included `render.yaml` for one-click setup.

### Frontend (Vercel)
1. In Vercel: New Project → import the repo.
2. Root Directory: `frontend/dashboard`
3. Framework: Create React App (auto-detected)
4. Build Command: `npm run build`
5. Output Directory: `build`
