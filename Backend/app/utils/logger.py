import logging

def create_logger():
    logger = logging.getLogger()  # Root logger instance
    log_format = logging.Formatter("%(asctime)-15s %(levelname)-2s %(message)s")  # Setting log format (timestamp, level, message)
    sh = logging.StreamHandler()  # Directing log messages to the console
    sh.setFormatter(log_format)  # Setting formatter to the handler (to display messages in the above form)
    logger.addHandler(sh)  # Adding stream handler to the root logger (i.e. logger will send messages to the handler which will in turn print to the console)
    logger.setLevel(logging.DEBUG)  # Setting logging level of root logger.
    # Setting it to 'DEBUG' will capture all levels of log messages (i.e. 'DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL').
    # However, setting it to for example 'INFO', it will log messages of 'INFO' level and and higher severity messages ('WARNING', 'ERROR', 'CRITICAL') but not lower severity ('DEBUG')

    return logger

logger = create_logger()