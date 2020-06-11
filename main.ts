let player = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, 0)
let stand = img`
    . . . . . . . f f f . . . . . .
    . f . . . . . f f f . . . . . .
    . f f . . . . f f f . . . . f .
    . . f f f . . . f . . . . f f .
    . . . . f f f f f f f f f . . .
    . . . . . . . . f . . . . . . .
    . . . . . . . . f . . . . . . .
    . . . . . . . . f . . . . . . .
    . . . . . . f f f f . . . . . .
    . . . . . f f . . . f . . . . .
    . . . . . f . . . . f f . . . .
    . . . . f . . . . . . f f . . .
    . . . . f . . . . . . . f . . .
    . . . . f . . . . . . . f . . .
    . . . . f . . . . . . . f . . .
    . . . . f . . . . . . . f . . .
`
let jump = img`
    . . . . . . . . f f f . . . . .
    . . . . . . . . f f f . . . . .
    . . f f . . . . f f f . . . f .
    . . . f f f f f f f f f f f . .
    . . . . . . . . . f . . . . . .
    . . . . . . . . . f . . . . . .
    . . . f f . . . . f . . . . . .
    . . . f f f . . . f . . f . . .
    . . f . . f f . . f . f f f . .
    . . f . . . f f f . f . . f . .
    . . f . . . . f . f . . . f . .
    . . f . . . . f f . . . . . f .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`
let platform = sprites.create(img`
    f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
    f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
    f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f
`)
scene.setBackgroundColor(3)
player.setImage(stand)

let gravity = .1
let ySpeed = 0
let lastY = 0
player.y = screen.width

platform.y += 25

game.onUpdate(function () {
    if(player.y < screen.height - player.width/2)
    {
        ySpeed += gravity
    }
    else
    {
        player.y = screen.height - player.width / 2
        ySpeed = 0
    }
    if(controller.A.isPressed() && ySpeed == 0)
    {
        ySpeed -= 2.5
    }
    if(controller.left.isPressed())
    {
        player.x -= 2;
        if(player.x < player.width/2)
        {
            player.x = player.width / 2
        }
    }
    if (controller.right.isPressed()) {
        player.x += 2;
        if (player.x > screen.width - player.width / 2) {
            player.x = screen.width - player.width / 2
        }
    }
    player.y += ySpeed
    if(player.y - lastY > 0 && 
        player.y <= platform.y - platform.height / 2 - player.height / 2 &&
        Collision(player, platform))
    {
        player.y = platform.y - platform.height/2 - player.height/2
        ySpeed = 0
        if (controller.A.isPressed()) {
            ySpeed -= 2.5
        }
    }
    lastY = player.y;
})

function Collision(a: Sprite, b: Sprite) {
    return a.x - a.width / 2 < b.x + b.width / 2 &&
        a.x + a.width / 2 > b.x - b.width / 2 &&
        a.y - a.height / 2 < b.y + b.height / 2 &&
        a.y + a.height / 2 > b.y - b.height / 2;
}