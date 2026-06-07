import schedule
import time
from flask_app.models.users import User


def update_is_paying_job():
    users = User.get_all()
    for user in users:
        user.update_is_paying()


schedule.every(12).hours.do(update_is_paying_job)

while True:
    schedule.run_pending()
    time.sleep(1)
