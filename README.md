# FrontendTutor

A Flask web application that provides frontend development tutorials with user accounts and subscription-based access tiers.

## Tech Stack

- **Backend:** Python / Flask
- **Database:** MySQL
- **Payments:** Stripe (subscriptions + webhooks)
- **Email:** Flask-Mail (Gmail SMTP)
- **Auth:** Flask sessions + bcrypt password hashing
- **Deployment:** Gunicorn / Heroku (Procfile)

## Project Structure

```
FrontendTutor/
├── server.py                    # Entry point
├── requirements.txt
├── Procfile                     # Gunicorn config for deployment
└── flask_app/
    ├── __init__.py              # App factory, mail config
    ├── scheduler.py             # Background job for subscription expiry
    ├── config/
    │   └── mysqlconnection.py   # DB connection helper
    ├── controllers/
    │   ├── userController.py    # Auth, profile, password reset routes
    │   ├── videoController.py   # Video listing route
    │   └── paymentController.py # Stripe checkout routes
    ├── models/
    │   ├── users.py             # User ORM + validation
    │   ├── videos.py            # Video ORM
    │   └── payments.py          # Payment ORM
    └── templates/               # Jinja2 HTML templates
```

## How It Works

### User Flow

1. **Register** (`/register`) — user fills out name, email, password. A Stripe customer is created automatically and the `stripe_customer_id` is saved alongside the user.
2. **Login** (`/login`) — bcrypt-verified, session-based auth.
3. **Dashboard** (`/`) — landing page shows different content depending on login state and subscription tier.
4. **Profile** (`/profile/.../<id>`) — update name/email, trigger a password reset email.

### Subscription Flow

1. User visits **Pricing** (`/pricing/<id>`) and picks a plan.
2. A Stripe Checkout Session is created (`/create-checkout-session` or `/create-checkout-session/premium`).
3. On successful payment Stripe fires a webhook (`/webhook`) which updates `is_paying`, `plan_type`, and `subscription_expires_at` in the database.
4. A background scheduler periodically checks `subscription_expires_at` and marks expired users as non-paying.

### Password Reset Flow

1. User submits email on `/forgot/pass`.
2. A signed, time-limited token is generated with `itsdangerous.URLSafeTimedSerializer`.
3. A reset email is sent via Gmail SMTP containing `/new/password/<token>`.
4. Token expires after 24 hours.

## Setup

### Prerequisites

- Python 3.9+
- MySQL running locally with a `frontend_tutor` database
- A Stripe account (test mode keys are fine)
- A Gmail account with an App Password

### Install

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Environment / Config

Sensitive values are currently hardcoded in `flask_app/__init__.py` and the controllers. Before running in production, move these to a `.env` file and load them with `python-dotenv`:

| Variable | Where used |
|---|---|
| `SECRET_KEY` | `app.secret_key` in `__init__.py` |
| `MAIL_USERNAME` | Gmail sender address |
| `MAIL_PASSWORD` | Gmail App Password |
| `STRIPE_SECRET_KEY` | All controllers |
| `STRIPE_WEBHOOK_SECRET` | `userController.py` webhook handler |
| `DB_HOST / DB_USER / DB_PASS` | `config/mysqlconnection.py` |

### Database

Create the MySQL database and run your migrations:

```sql
CREATE DATABASE frontend_tutor;
```

Then apply the schema (add your migration files here).

### Run Locally

```bash
python server.py
```

App runs on `http://localhost:4142`.

### Run with Gunicorn (production)

```bash
gunicorn server:app
```

### Stripe Webhooks (local testing)

Use the Stripe CLI to forward events to your local server:

```bash
stripe listen --forward-to localhost:4142/webhook
```

## Routes Reference

| Method | Route | Description |
|---|---|---|
| GET | `/` | Landing page / dashboard |
| GET | `/login` | Login page |
| POST | `/login/user` | Process login |
| GET | `/register` | Registration page |
| POST | `/create-customer` | Process registration + create Stripe customer |
| GET | `/logout` | Clear session |
| GET | `/profile/.../prof/<id>` | Profile page |
| POST | `/update/email` | Update email |
| POST | `/update/name` | Update display name |
| GET | `/forgot/pass` | Forgot password page |
| POST | `/forgot/password/form` | Send reset email (from login page) |
| POST | `/forgot/password` | Send reset email (from profile page) |
| GET/POST | `/new/password/<token>` | Reset password with token |
| GET | `/pricing/<id>` | Pricing page |
| POST | `/create-checkout-session` | Create Stripe Checkout (basic plan) |
| POST | `/create-checkout-session/premium` | Create Stripe Checkout (premium plan) |
| POST | `/create-customer-portal-session` | Redirect to Stripe billing portal |
| POST | `/webhook` | Stripe webhook handler |
| GET | `/showvid` | Video listing page |
