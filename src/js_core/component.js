export class Component {
    constructor(id) {
        this.$el = document.getElementById(id)
        this.init()
    }

    init() {}   // Инициализация "свойства" и "поведения"
    onHide() {} // Метод потока. Выполнить действия когда эелемент скрылся

    onShow() { // Метод потока. Выполнить действия когда эелемент показался
        animate.call(this)
    }

    show() {
        this.$el.classList.remove('hide')
        this.onShow()
    }
    hide() {
        this.$el.classList.add('hide')
        this.onHide()
    }
}

function animate() {
    this.$el.classList.add('for-anime')
}