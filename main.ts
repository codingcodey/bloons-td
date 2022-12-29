namespace SpriteKind {
    export const Tower = SpriteKind.create()
}
function createTower () {
    if (info.score() >= 5) {
        bloonPopper = sprites.create(towers._pickRandom(), SpriteKind.Tower)
        tiles.placeOnTile(bloonPopper, tiles.locationOfSprite(cursor))
        bloonPoppers.push(bloonPopper)
        info.changeScoreBy(-5)
    }
}
function cloneSprite (sprite: Sprite) {
    console.log(sprite)
    newSprite = sprites.create(sprite.image, sprite.kind())
    newSprite.x = sprite.x
    newSprite.y = sprite.y
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (canCreate) {
        createTower()
    }
})
function makeBloonPopperProjectile (bloonPopper: Sprite) {
    dart = sprites.create(img`
        . 5 . 2 2 . 5 . 
        . . 2 4 3 2 . . 
        . . 2 3 3 2 . . 
        . 5 . 2 2 . 5 . 
        `, SpriteKind.Projectile)
    dart.setPosition(bloonPopper.x, bloonPopper.y)
    if (bloonPopper.tileKindAt(TileDirection.Top, sprites.castle.tilePath5)) {
        dart.vy = -50
    } else if (bloonPopper.tileKindAt(TileDirection.Right, sprites.castle.tilePath5)) {
        dart.vx = 50
    } else if (bloonPopper.tileKindAt(TileDirection.Bottom, sprites.castle.tilePath5)) {
        dart.vy = 50
    } else if (bloonPopper.tileKindAt(TileDirection.Left, sprites.castle.tilePath5)) {
        dart.vx = -50
    }
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
info.onCountdownEnd(function () {
    game.over(true, effects.confetti)
})
scene.onOverlapTile(SpriteKind.Enemy, sprites.swamp.swampTile2, function (sprite5, location) {
    game.over(false, effects.dissolve)
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    sprite.destroy()
})
let bloon: Sprite = null
let dart: Sprite = null
let canCreate = false
let newSprite: Sprite = null
let bloonPopper: Sprite = null
let bloonPoppers: Sprite[] = []
let towers: Image[] = []
let cursor: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
cursor = sprites.create(assets.image`Cursor`, SpriteKind.Player)
controller.moveSprite(cursor)
cursor.setFlag(SpriteFlag.Ghost, true)
cursor.setStayInScreen(true)
scene.cameraFollowSprite(cursor)
let base = tiles.getTilesByType(sprites.swamp.swampTile2)[0]
let bloonSpawner = tiles.getTilesByType(sprites.builtin.forestTiles0)[0]
let path = scene.aStar(bloonSpawner, base)
info.startCountdown(60)
towers = [img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 4 4 4 4 . . . . . . 
    . . . . 4 4 4 5 5 4 4 4 . . . . 
    . . . 3 3 3 3 4 4 4 4 4 4 . . . 
    . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
    . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
    . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
    . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
    . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
    . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
    . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
    . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
    . . . 4 2 2 2 2 2 2 2 2 4 . . . 
    . . . . 4 4 2 2 2 2 4 4 . . . . 
    . . . . . . 4 4 4 4 . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 6 6 6 6 . . . . . . 
    . . . . 6 6 6 5 5 6 6 6 . . . . 
    . . . 7 7 7 7 6 6 6 6 6 6 . . . 
    . . 6 7 7 7 7 8 8 8 1 1 6 6 . . 
    . . 7 7 7 7 7 8 8 8 1 1 5 6 . . 
    . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 . 
    . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 . 
    . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 . 
    . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 . 
    . . 6 8 7 7 8 6 6 6 6 6 8 6 . . 
    . . 6 8 8 7 8 8 6 6 6 8 6 6 . . 
    . . . 6 8 8 8 8 8 8 8 8 6 . . . 
    . . . . 6 6 8 8 8 8 6 6 . . . . 
    . . . . . . 6 6 6 6 . . . . . . 
    . . . . . . . . . . . . . . . . 
    `]
let bloons = [
assets.image`Bloon`,
assets.image`Bloon0`,
assets.image`Bloon2`,
assets.image`Bloon3`
]
bloonPoppers = []
info.setScore(100)
game.onUpdate(function () {
    if (cursor.tileKindAt(TileDirection.Center, sprites.swamp.swampTile13)) {
        canCreate = true
        cursor.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f f f f f f f f f f . . . 
            . . . f . . . . . . . . f . . . 
            . . . f . . . . . . . . f . . . 
            . . . f . . . . . . . . f . . . 
            . . . f . . . . . . . . f . . . 
            . . . f . . . . . . . . f . . . 
            . . . f . . . . . . . . f . . . 
            . . . f . . . . . . . . f . . . 
            . . . f . . . . . . . . f . . . 
            . . . f f f f f f f f f f . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    } else {
        canCreate = false
        cursor.setImage(assets.image`Cursor`)
    }
})
game.onUpdateInterval(1000, function () {
    bloon = sprites.create(bloons._pickRandom(), SpriteKind.Enemy)
    tiles.placeOnRandomTile(bloon, sprites.builtin.forestTiles0)
    bloon.setVelocity(-10, 50)
    scene.followPath(bloon, path)
})
game.onUpdateInterval(1000, function () {
    for (let bloonPopper of bloonPoppers) {
        makeBloonPopperProjectile(bloonPopper)
    }
})
