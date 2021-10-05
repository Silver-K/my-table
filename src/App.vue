<template>
  <div id="app">
    <div style="margin: 20px 0; width: 100px">
       <button style="width: 100%; color: #009688; padding: 10px" @click="handleAdd"><span>增加</span></button>
    </div>

    <my-table :data="data" :header="header" xcolor>
      <template #action="{ row }">
        <button  style="width: 30%; color: #009688" @click="handleDel(row)">
          <span>删除</span> 
        </button>
        <button  style="width: 30%; color: #009688" @click="handleEdit(row)">
          <span>编辑</span> 
        </button>
      </template>
    </my-table>
  </div>
</template>

<script>
import myTable from '@/components/my-table/index'
export default {
  name: 'App',
  components: {
    myTable
  },
  data() {
    return {
      header: [
        'name',
        'sex',
        'age',
        'hobby',
        'action'
      ],
      data: [
        {
          name: 'hhh',
          sex: '男',
          age: 12,
          hobby: '游泳'
        },
        {
          name: 'uuu',
          sex: '女',
          age: 13,
          hobby: '打球'
        },
        {
          name: 'lll',
          sex: '男',
          age: 10,
          hobby: '看书'
        },
        {
          name: 'xyx',
          sex: '女',
          age: 12,
          hobby: '打羽毛球'
        },
        {
          name: 'tcz',
          sex: '男',
          age: 12,
          hobby: '码代码'
        },
        {
          name: 'yyy',
          sex: '女',
          age: 13,
          hobby: '听音乐'
        }
      ]
    }
  },
  methods: {
    handleDel(row) {
      const index = this.data.findIndex(i => row === i)
      this.data.splice(index, 1)
    },
    handleEdit(row) {
      alert('修改成功')
      row.name = '已修改'
    },
    handleAdd() {
      this.data.push({
        name: 'aaa',
        sex: '女',
        age: 12,
        hobby: '打字'
      })
    }
  }
}
</script>

<style>
</style>
