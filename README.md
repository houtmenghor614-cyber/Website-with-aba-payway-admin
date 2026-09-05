# T-Shirt Cambodia — Admin Panel (React)

Admin dashboard for the FastAPI backend. Manage products, orders, payments
(including **gateway re-sync**), customers, coupons, banners, stock, reviews,
receipts, reports and the **Telegram bot** — with notifications and broadcasts.

- **Tailwind CSS via CDN** (`public/index.html`) — no style build step
- **Icons**: `lucide-react` (no emoji)
- All requests go to the backend at `http://127.0.0.1:8000/api/v1`

## 1. Requirements

- Node 16+ (React 18, react-scripts 5)
- Backend running on `http://127.0.0.1:8000` (see `../backend/README.md`)

## 2. Setup & run

```bash
cd frontend_admin
npm install
npm start                # http://localhost:3001 (or 3000 if free)
```

Override the backend URL with `frontend_admin/.env`:

```ini
REACT_APP_API_URL=http://127.0.0.1:8000/api/v1
REACT_APP_ASSET_URL=http://127.0.0.1:8000/uploads
```

## 3. Signing in

The seed admin account:

```
email:    admin@tshirtcambodia.com
password: admin1234
```

Create it (once) with:

```bash
cd ../backend
python -m app.seed.admin
```

This also migrates an existing `admin@tshirt.local`-style account to the real
domain, because pydantic's email validator rejects reserved domains such as
`.local`. Only accounts with `role == "admin"` can sign in here; the panel
redirects other accounts away.

## 4. What you can do

| Area | Highlights |
|---|---|
| Dashboard | Revenue card, 7-day sales/orders charts, recent orders/users, low-stock alerts |
| Products | Create/edit/delete, upload product images, set main image, gallery |
| Categories | CRUD + category image upload |
| Orders | Filter by status/search, open detail, change status (Telegram notified), see items/address/totals/payments |
| Payments | Status filter, **manual gateway check** by transaction id, **re-sync** a payment (auto-check) |
| Customers | Search, view profile, enable/disable accounts |
| Coupons / Banners | CRUD with previews |
| Stock | Table, **adjust stock** (logs a movement), per-product movement history, low-stock alert |
| Reviews | List, approve, delete |
| Receipts | List + receipt preview |
| Reports | Sales, orders-by-status, top sellers, customers, payment summary |
| Notifications | Broadcast to customers (Telegram + in-app) |
| Telegram | Bot status, test message to admin chat |
| Settings | Store/payment info, Telegram status, admin profile, change password |

## 5. Scripts

```bash
npm start       # dev server
npm run build   # production build to build/
```
