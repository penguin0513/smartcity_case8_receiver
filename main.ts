WiFiIoT.on_wifi_connect(function (IP_Address, Device_ID) {
    basic.showIcon(IconNames.Yes)
    WiFiIoT.wifi_listen_channel("YLLSS")
})
function TurnGreen () {
    SmartCity.control_traffic_light(
    true,
    false,
    false,
    AnalogPin.P1
    )
    basic.pause(2000)
    SmartCity.control_traffic_light(
    true,
    true,
    false,
    AnalogPin.P1
    )
    basic.pause(2000)
    SmartCity.control_traffic_light(
    false,
    false,
    true,
    AnalogPin.P1
    )
    basic.pause(2000)
}
function TurnRed () {
    SmartCity.control_traffic_light(
    false,
    false,
    true,
    AnalogPin.P1
    )
    basic.pause(2000)
    SmartCity.control_traffic_light(
    false,
    true,
    false,
    AnalogPin.P1
    )
    basic.pause(2000)
    SmartCity.control_traffic_light(
    true,
    false,
    false,
    AnalogPin.P1
    )
    basic.pause(2000)
}
WiFiIoT.on_wifi_received(function (Channel, receivedMessage) {
    OLED.clear()
    OLED.writeStringNewLine("Message: " + receivedMessage)
    if (receivedMessage != oldmsg) {
        oldmsg = receivedMessage
        if (receivedMessage == "trafficjam") {
            TurnRed()
        } else if (receivedMessage == "nojam") {
            TurnGreen()
        }
    }
})
let oldmsg = ""
OLED.init(128, 64)
WiFiIoT.initializeWifi(SerialPin.P16, SerialPin.P8)
WiFiIoT.setWifi("YLL_R213", "studywifi")
oldmsg = "0"
