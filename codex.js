document.addEventListener('DOMContentLoaded', () => {
    // let map = ["12 12 12 12 12"]
    let rooms = [
        /*formatação do map:
        [
            [000000000000000000000 (coordenadas X, onde 0 (falso) e 1 (true))] -> coordenada y (indo de 0 --> 20)
        ]*/
        //map base
        [
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1", 
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1", 
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1", 
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1", 
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1", 
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1", 
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1", 
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1", 
            "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1"
        ],
        [
            "1 1 0 1"
        ]
    ]
    function verificarPlano(){
        
    }
    function moverPlayer(){

    }

    
    function gerarMap(map){
        rooms[map].forEach(y => {
            let linhas = y.replaceAll(" ", "")
            alert(linhas)
            
        });


       
    }

    gerarMap(0)
    
    
})

