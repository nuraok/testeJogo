import { say, cord } from './brev.js'

document.addEventListener('DOMContentLoaded', () => {
    let keys = {
        w: false,
        a: false,
        s: false,
        d: false
    }

    let gridScreen = []

    let screenSize = cord(21, 15)
    let screenStart = cord(0, 0)
    let player = cord(11, 8)

    let row = 0
    let col = 0
    let rooms = [
        /*formatação do map:
        [
        0110 (coordenadas X, onde 0 (falso) e 1 (true))] -> coordenada y (indo de 0 --> 14)
        ]*/
        //map base
        [
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1"
        ],
        [
            "4 1 0 1",
            "0 1 0 1 0 1 1"
        ]
    ]
    function gerarMap(map) {
        return rooms[map].map(y => {
            return col = y.replaceAll(" ", "")
        });
    }
    function gerarGridScreen(map) {
        let newRoom = gerarMap(map)
        gridScreen = newRoom.slice(screenStart.y, screenStart.y + screenSize.y)
        gridScreen = gridScreen.map(element => {
            return element.slice(screenStart.x, screenStart.x + screenSize.x)
        })
        // say(gridScreen)

    }

    function verificarPlano(x, y, map) {
        let newRoom = gerarMap(map)
        let colNewRoom = newRoom.map(elemento => {
            return elemento[x]
        })

        // say(`row: ${y+1} (${newRoom[y]}), col: ${x+1} (${colNewRoom.join("")})`)

    }
    function findPoint(objeto) {
        //acha o status do ponto exato que algo se enquadra:

        let newRoom = gerarMap(map)
        newRoom = newRoom[objeto.y]
        return newRoom.slice[objeto.x, objeto.x + 1]
    }

    function mover(map) {
        let newRoom = gerarMap(map)

        let moveX = 0
        let moveY = 0

        if (keys.w) moveY--
        if (keys.s) moveY++
        if (keys.a) moveX--
        if (keys.d) moveX++

        if (gridScreen.length < screenSize.y || gridScreen[0].length < screenSize.x || player.x != 11 && player.y != 8) {
            // player moves
        }
        else {
            // background moves
            if (findPoint(player) == 1){
                screenStart.x += moveX
                screenStart.y += moveY
                //fazer o background mudar para o lado oposto (depois)
            }
        }

        mover(0)
    }



    document.addEventListener('keydown', (key) => {
        key = key.key.toLowerCase()
        if (key in keys) {
            keys[key] = true
        }
    })
    document.addEventListener('keyup', (key) => {
        key = key.key.toLowerCase()
        if (key in keys) {
            keys[key] = false
        }
    })

    gerarMap(0)


})
