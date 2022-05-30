<template :key="marks">
  <div class="container">
    <div class="card">
      <confirm-window v-if="this.$store.state.showModal != 'false'" @close="confirm">
        <template v-slot:header>
          <h3 slot="header">Вы уверены?</h3>
        </template>
        <template v-slot:body>
          <p slot="body">Подтвердите действие</p>
        </template>
      </confirm-window>
      <h1>Main Page</h1>
      <div v-if="!marks || marks.length === 0">
        <p>Пусто</p>
      </div>
      <div v-else>
        <div v-for="i in marks" :key="i" style="flex-direction: row">
          <div>
            <h3>{{ i.header }}</h3>
            <div v-if="i.body.length!==0">
              <div v-for="(elem, index) in i.body" :key="elem">
                <div v-if="index<3">
                  <input type="checkbox" disabled="" style="margin-right: 15px" :checked="elem.checked">
                  <label>{{ elem.value }}</label>
                </div>
              </div>
            </div>
            <div v-else>
              <p style="color: #999999">Заметок нет</p>
            </div>
            <div v-if="i.body.length>3">
              <p>...</p>
            </div>
          </div>
          <a style="margin-top: 2px" class="primary"
             @mousemove="next"
             @click="this.$router.push({path:`/mark/${id=i.id}/edit`})"
          >Перейти к редактированию</a>
          <p @mousemove="mark=i" @click="this.$store.state.showModal = 'trueDelete'">Удалить</p>
          <hr>
        </div>
      </div>
    </div>
    <button class="btn primary" @click="addMark">Создать новую заметку</button>
  </div>
</template>

<script>
import ConfirmWindow from "@/components/ConfirmWindow";
export default {
  name: 'MainPage.vue',
  components:{ConfirmWindow},
  data: () => ({
    marks: {},
    ind: 0,
    mark: ""
  }),
  methods: {
    addMark() {
      let lastId
      try {
        lastId = this.marks[this.marks.length-1].id
      } catch(err) {
        lastId = -1
      }
      this.marks.push({'header': 'Заголовок', 'body': [], 'checked': [], 'id': lastId+1})
      localStorage.setItem('marks', JSON.stringify(this.marks))
      console.log('Добавили')
      console.log(JSON.parse(localStorage.getItem('marks')))
    },
    confirm() {
      let showModal = this.$store.state.showModal
      if (showModal === "trueDelete") this.deleteElem()
      this.$store.state.showModal = 'false'
      console.log('123')
    },
    deleteElem() {
      this.marks.splice(this.marks.indexOf(this.mark),1)
      localStorage.setItem('marks', JSON.stringify(this.marks))
      console.log(JSON.parse(localStorage.getItem('marks')))
    }
  },
  beforeMount() {
    this.marks = JSON.parse(localStorage.getItem('marks'))
    if (!this.marks) {
      localStorage.setItem('marks', JSON.stringify(this.$store.state.marks))
      this.marks = JSON.parse(localStorage.getItem('marks'))
    }
  }
}

</script>

<style>

</style>
