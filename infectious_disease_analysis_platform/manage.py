#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

from numpy import block


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'infectious_disease_analysis_platform.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    # from timeloop import Timeloop
    # from datetime import timedelta
    # tl = Timeloop()

    # # 每天自动更新
    # @tl.job(interval=timedelta(seconds=60*60*24))
    # def update_data_every_1d():
    #     from visual.core_function.update import Update
    #     data_path = "visual/core_function/data"
    #     d_confirm_path = f'{data_path}/daily_confirm.csv'
    #     d_death_path = f'{data_path}/daily_death.csv'
    #     p_confirm_path = f'{data_path}/predict_confirm.csv'
    #     p_death_path = f'{data_path}/predict_death.csv'
    #     save_path = 'visual/static/datas/plot.json'
    #     update_task = Update(d_confirm_path,d_death_path,p_confirm_path,p_death_path,save_path)
    #     update_task.update_json_without_predict()
    # tl.start(block=False)
    
    main()
