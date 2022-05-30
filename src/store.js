import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state: () => ({
        showModal: 'false',
        marks: [{
            header: 'Заметка 1',
            body: [
                {
                    value: 'Текст 1',
                    checked: false
                },
                {
                    value: 'Текст 2',
                    checked: false
                },
                {
                    value: 'Текст 3',
                    checked: false
                },
                {
                    value: 'Текст 4',
                    checked: false
                },
                {
                    value: 'Текст 5',
                    checked: false
                },
            ],
            checked: [],
            id: 0
        }, {
            header: 'Заметка 2',
            body: [
                {
                    value: 'Текст 5',
                    checked: false
                },
                {
                    value: 'Текст 5',
                    checked: false
                },
                {
                    value: 'Текст 5',
                    checked: false
                },
            ],
            checked: [],
            id: 1
        }, {
            header: 'Заметка 3',
            body: [

            ],
            checked: [],
            id: 2
        }]
    }),
    getters: {
        getMarks: () => {
            return this.state.marks
        }
    },
    mutations: {
        confirm: () => {
            return this.store.showModal
        }
    },
    plugins: [createPersistedState()],
})
