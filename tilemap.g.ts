// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`1000100004040404020202040404040404040404020202020606060202020404040404040201010101010101010602040404040403010101010101010106020404040404020101010101010101060204040404040206060602020101010204040404040404020202020601010102040404040404040404040206010101020404040404040404040402060101010204040404040404040404040201010102020404040404040404040402020101010202040404040404040404040202010102020202040404040404040402020101020606060202040404040404020601010101010101050404040404040206010101010101010104040404040402060101010101010101`, img`
. . . . 2 2 2 . . . . . . . . . 
2 2 2 2 2 2 2 2 2 2 . . . . . . 
2 . . . . . . . . 2 2 . . . . . 
. . . . . . . . . 2 2 . . . . . 
2 . . . . . . . . 2 2 . . . . . 
2 2 2 2 2 2 . . . 2 . . . . . . 
. 2 2 2 2 2 . . . 2 . . . . . . 
. . . . 2 2 . . . 2 . . . . . . 
. . . . 2 2 . . . 2 . . . . . . 
. . . . . 2 . . . 2 2 . . . . . 
. . . . . 2 2 . . . 2 2 . . . . 
. . . . . . 2 2 . . 2 2 2 2 . . 
. . . . . . 2 2 . . 2 2 2 2 2 2 
. . . . . . 2 2 . . . . . . . . 
. . . . . . 2 2 . . . . . . . . 
. . . . . . 2 2 . . . . . . . . 
`, [myTiles.transparency16,sprites.castle.tilePath5,sprites.castle.tileGrass1,sprites.swamp.swampTile2,sprites.castle.tileDarkGrass1,sprites.builtin.forestTiles0,sprites.swamp.swampTile13], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
