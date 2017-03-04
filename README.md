# coffeebot
The percolations are imminent.

![The percolations are imminent](assets/burns-coffee.jpg "I stomped the beans myself!")

# parts
- Raspberry Pi Zero
- [MCP23008](https://www.adafruit.com/products/593)
- [Non-invasive current sensor](https://www.sparkfun.com/products/11005)
- 2 10k resistors
- 1 10uF capacitor
- optional - extension cord

# how it works
Using the non-invasive current sensor (CT sensor), the circuit will measure the time it takes electrical current to fill the capacitor.

When there's a lot of current, the capacitor will discharge quickly. When there's not a lot of current, the capacitor will discharge slowly.

For drip coffee pots, there are three basic states:
* Idle
* Brewing
* Heating

For example, your drip coffee pot might discharge the capacitor in ~2.5 seconds when `idle`. When it's actively `brewing`, the capacitor might discharge in ~150 milliseconds.

# setup

## circuit
![alt text](assets/coffeebot.png "Wiring Diagram")
[coffeebot.fzz](assets/coffeebot.fzz)

Your coffee pot uses an alternating current (AC). An AC cord is composed of two wires. For your CT sensor to work correctly, you will have to wrap it around only one of those wires.

If you do not want to risk cutting your coffee pot cord, you can buy a cheap extension cord and use that. Carefully separate the two wires by cutting down the middle and pull apart.

## raspbery pi
* Operating System Installation
  * Download [Raspian Jessie](https://www.raspberrypi.org/downloads/raspbian/) Lite.
  * Put Raspian on your SD card. Follow instructions [here](https://www.raspberrypi.org/documentation/installation/installing-images/README.md)
* Opearting System Configuration
  * Initially, you will need an external display and keyboard. Get those, plug in and power on the pi.
    * When your pi boots up, log in with:
      * username: `pi`
      * password: `raspberry` (we'll change this later)
  * Type `sudo raspi-config`
    * Expand file system
    * Internationalization options - adjust as necessary.
    * Change your password - if you want
    * `Advanced Options - Hostname` - change the hostname of your Pi (optional)
    * `Advanced Options - Enable I2C`
    * `Advanced Options - Enable SSH`
    * `Advanced Options - Enable SPI`
    * Reboot
  * Setup Wifi
    * Follow the instructions [here](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md)
      * You can now ditch your keyboard and display.
      * `sudo reboot`
      * Find the IP address of your Pi on your network
      * `ssh pi@192.168.x.x`
      * Enter password: `raspberry`
  * Install updates
    * `sudo apt-get update`
    * `sudo apt-get upgrade`
  * Install `node`
    * `cd /tmp`
    * `wget http://node-arm.herokuapp.com/node_latest_armhf.deb`
    * `sudo dpkg -i node_latest_armhf.deb`
  * Install `git`
    * `sudo apt-get install git`
* Configure `i2c`
  * `nano /boot/config.txt`
  * Add to the bottom:
  ```
  dtparam=i2c1=on
  dtparam=i2c_arm=on
  dtparam=i2c=on
  dtparam=i2c_arm_baudrate=10000
  ```
* Configure Git
  * `ssh-keygen -t rsa -C pi@<your host name>`
  * copy contents of `id_rsa.pub` as a new GitHub SSH key
    * `cat /home/pi/.ssh/id_rsa.pub`
* Get `coffeebot` code
  * `git clone <this repository>`
  * `cd coffeebot`
  * `cp /config/default.json.example /config/default.json`

# configure coffeebot
In `/config/default.json`:

* `threshold` - This is an estimation of average milliseconds between capacitor discharges while the coffeepot is `brewing`

* `consecutive` - How many consecutive `brewing` discharges should occur until you're confident the pot is brewing.

* `brew_time` - after the `threshold` has been met the # of `consecutive` times, how long until the coffee is done (in milliseconds).

* `notification_type` - how should the coffeebot notify that coffee is ready. currently supported: `slack`

* `notification` - configuration options for the `notification_type`

* `notification_messages` - a random collection of notifications for the `coffee is brewing` state or the `coffee is done` state.

# usage
* `./run.sh`

# development
* code is in `/src`
* to build: `npm run build`

# contributing
* Feel free to issue pull requests or work an any open issues.
  * Additional notification options would be appreciated.
  * Adding your coffeepot settings to the [wiki](https://github.com/jonpitch/coffeebot/wiki/Coffee-Pots) would also be appreciated.