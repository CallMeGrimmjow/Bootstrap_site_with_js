let grades = {}
let tpi = []
let baseKnowledges = []
let ecgKnowledges = []
let modulesICT = []
let generalAverageGrades = []


window.addEventListener('load', () => {
    if (localStorage.getItem('savedGrades') === null) {
        getGradesValuesFromHTML()
    } else {
        grades = JSON.parse(localStorage.getItem('savedGrades'))
        upgradeGradeWhenTheyAreAllReadyInHTML()
    }
    console.log(JSON.parse(localStorage.getItem('savedGrades')))
    registerChangeEventListenerOnInputs()
})


function calculateAverage(gradesArray) {

    let sum = 0
    let divider = 0

    for (let i = 0; i < gradesArray.length; i++) {
        if (!isNaN(gradesArray[i])) {
            sum += gradesArray[i]
            divider++
        }
    }
    return sum / divider
}


function weightedAverage(gradesArray, weightArray) {

    let sum = 0
    let divider = 0

    for (let i = 0; i < gradesArray.length; i++) {
        if (!isNaN(gradesArray[i])) {
            sum = sum + (gradesArray[i] * weightArray[i])
            divider += weightArray[i]
        }
    }
    return sum / divider
}


function roundNumber(number, multiple) {
    return (Math.round(number / multiple) * multiple).toFixed(1)
}

function upgradeGradeWhenTheyAreAllReadyInHTML(){
    for (let updateGrades in grades){
        document.getElementById(updateGrades).value = grades[updateGrades]
    }
}


function getGradesValuesFromHTML() {
    let inputs = document.getElementsByTagName('select')

    for (let input of inputs) {
        grades[input.id] = parseFloat(input.value)
    }
    arrayConstitution()
    console.log(JSON.stringify(grades))
    localStorage.setItem('savedGrades', JSON.stringify(grades))
}

function arrayConstitution() {

    baseKnowledges = [
        grades['maths_1'],
        grades['maths_2'],
        grades['maths_3'],

        grades['eng_1'],
        grades['eng_2'],
        grades['eng_3'],
        grades['eng_4'],
        grades['eng_5'],
    ]
    let baseKnowledgeAvg = roundNumber(calculateAverage(baseKnowledges), 0.5)
    console.log(baseKnowledgeAvg)

    ecgKnowledges = [
        grades['society_1'],
        grades['society_2'],
        grades['society_3'],
        grades['society_4'],
        grades['society_5'],
        grades['society_6'],
        grades['society_7'],
        grades['society_8'],

        grades['lc_1'],
        grades['lc_2'],
        grades['lc_3'],
        grades['lc_4'],
        grades['lc_5'],
        grades['lc_6'],
        grades['lc_7'],
        grades['lc_8'],
    ]
    let ecgKnowledgeAvg = roundNumber(calculateAverage(ecgKnowledges), 0.5)
    console.log(ecgKnowledgeAvg)

    tpi = [
        grades['tpi_grade'],
    ]
    let tpiAvg = roundNumber(calculateAverage(tpi), 0.1)
    console.log(tpiAvg)

    modulesICT = [
        grades['epsic_grade'],
        grades['cie_grade'],
    ]
    let modulesICTWeight = [80, 20]

    let modulesICTAvg = roundNumber(weightedAverage(modulesICT, modulesICTWeight), 0.1)
    console.log(modulesICTAvg)

    generalAverageGrades = [
        baseKnowledgeAvg,
        ecgKnowledgeAvg,
        modulesICT,
        grades['tpi'],
    ]
    let generalAverageGradesWeight = [10, 20, 30, 40]

    let moyenneCFCAvg = roundNumber(weightedAverage(generalAverageGrades, generalAverageGradesWeight), 0.1)
    console.log(moyenneCFCAvg)

    function failOrSuccess() {
        let result
        if (moyenneCFCAvg > 4) {
            result = 'réussi'
        } else {
            result = 'échoué'
        }
        return result;
    }

    writeJsToHTML(baseKnowledgeAvg, ecgKnowledgeAvg, modulesICTAvg, moyenneCFCAvg, failOrSuccess())
}


function registerChangeEventListenerOnInputs() {
    let inputs = document.getElementsByTagName('select')

    for (let input of inputs) {
        input.addEventListener('change', getGradesValuesFromHTML)
    }
}


function writeJsToHTML(baseKnowledgeAvg, ecgKnowledgeAvg, modulesICTAvg, moyenneCFCAvg, failOrSuccess) {
    document.getElementById('moyenne-base-elargies').innerHTML = baseKnowledgeAvg
    document.getElementById('moyenne-ecg').innerHTML = ecgKnowledgeAvg
    document.getElementById('moyenne-ict').innerHTML = modulesICTAvg
    document.getElementById('moyenne-cfc').innerHTML = moyenneCFCAvg
    document.getElementById('alerte').innerHTML = failOrSuccess
}