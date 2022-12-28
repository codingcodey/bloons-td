@namespace
class SpriteKind:
    Tower = SpriteKind.create()

def on_on_destroyed(sprite):
    global dart
    cloneSprite("sprite")
    dart = sprites.create_projectile_from_sprite(img("""
            2 . 2 2 . . . . 
                    2 2 2 2 2 2 2 2 
                    2 . 2 2 . . . . 
                    . . . . . . . .
        """),
        sprite,
        50,
        0)
sprites.on_destroyed(SpriteKind.Tower, on_on_destroyed)

def createTower():
    global bloonPopper2
    if 4 < info.score():
        bloonPopper2 = sprites.create(towers._pick_random(), SpriteKind.Tower)
        tiles.place_on_tile(bloonPopper2, tiles.location_of_sprite(cursor))
        info.change_score_by(-4)
def cloneSprite(sprite2: str):
    global newSprite
    newSprite = sprites.create(bloonPopper2.image, bloonPopper2.kind())
    newSprite.x = bloonPopper2.x
    newSprite.y = bloonPopper2.y

def on_a_pressed():
    if canCreate:
        createTower()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def makeBloonPopperProjectile(bloonPopper: Sprite):
    global projectile
    projectile = sprites.create_projectile_from_sprite(img("""
            2 . 2 2 . . . . 
                    2 2 2 2 2 2 2 2 
                    2 . 2 2 . . . . 
                    . . . . . . . .
        """),
        bloonPopper,
        50,
        0)

def on_on_overlap(sprite3, otherSprite):
    sprite3.destroy()
    otherSprite.destroy()
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.enemy, SpriteKind.projectile, on_on_overlap)

def on_countdown_end():
    game.over(True, effects.confetti)
info.on_countdown_end(on_countdown_end)

def on_on_created(sprite4):
    sprite4.lifespan = 500
sprites.on_created(SpriteKind.Tower, on_on_created)

def on_overlap_tile(sprite5, location):
    game.over(False, effects.dissolve)
scene.on_overlap_tile(SpriteKind.enemy, sprites.swamp.swamp_tile2, on_overlap_tile)

bloon: Sprite = None
projectile: Sprite = None
canCreate = False
newSprite: Sprite = None
bloonPopper2: Sprite = None
dart: Sprite = None
towers: List[Image] = []
cursor: Sprite = None
tiles.set_current_tilemap(tilemap("""
    level1
"""))
cursor = sprites.create(assets.image("""
    Cursor
"""), SpriteKind.player)
controller.move_sprite(cursor)
cursor.set_flag(SpriteFlag.GHOST, True)
cursor.set_stay_in_screen(True)
scene.camera_follow_sprite(cursor)
base = tiles.get_tiles_by_type(sprites.swamp.swamp_tile2)[0]
bloonSpawner = tiles.get_tiles_by_type(sprites.builtin.forest_tiles0)[0]
path = scene.a_star(bloonSpawner, base)
info.start_countdown(60)
towers = [img("""
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
    """),
    img("""
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
    """)]
bloons = [assets.image("""
        Bloon
    """),
    assets.image("""
        Bloon0
    """),
    assets.image("""
        Bloon2
    """),
    assets.image("""
        Bloon3
    """)]
info.set_score(20)

def on_on_update():
    global canCreate
    if cursor.tile_kind_at(TileDirection.CENTER, sprites.swamp.swamp_tile13):
        canCreate = True
    else:
        canCreate = False
game.on_update(on_on_update)

def on_update_interval():
    global bloon
    bloon = sprites.create(bloons._pick_random(), SpriteKind.enemy)
    tiles.place_on_random_tile(bloon, sprites.builtin.forest_tiles0)
    bloon.set_velocity(-10, 50)
    scene.follow_path(bloon, path)
game.on_update_interval(5000, on_update_interval)
