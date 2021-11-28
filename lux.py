# Distributed with a free-will license.
# Use it any way you want, profit or free, provided it fits in the licenses of its associated works.
# TSL2561
# This code is designed to work with the TSL2561_I2CS I2C Mini Module available from ControlEverything.com.
# https://www.controleverything.com/content/Light?sku=TSL2561_I2CS#tabs-0-product_tabset-2

import smbus
import time
import RPi.GPIO as GPIO
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
#Set GPIO pin 29 is the Addr pin of second sensor
GPIO.setup(29, GPIO.OUT)
#Set pin 29 to high, so that the address of  second sensor will change from default(0x39) to 0x49
GPIO.output(29, GPIO.HIGH)
# Get I2C bus
bus = smbus.SMBus(1)

# TSL2561 address, 0x49(57)
# Select control register, 0x00(00) with command register, 0x80(128)
#		0x03(03)	Power ON mode
bus.write_byte_data(0x29, 0x00 | 0x80, 0x03)
bus.write_byte_data(0x49, 0x00 | 0x80, 0x03)
# TSL2561 address, 0x49(57)
# Select timing register, 0x01(01) with command register, 0x80(128)
#		0x02(02)	Nominal integration time = 402ms
bus.write_byte_data(0x29, 0x01 | 0x80, 0x02)
time.sleep(0.5)

bus.write_byte_data(0x49, 0x01 | 0x80, 0x02)

time.sleep(0.5)


# Output data to screen
def measure_lux(address):
    data = bus.read_i2c_block_data(address, 0x0C | 0x80, 2)
    data1= bus.read_i2c_block_data(address, 0x0E | 0x80, 2)
    return data[1]*256+data[0],data1[1]*256+data1[0]
