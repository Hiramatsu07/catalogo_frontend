<template>
  <nav class="pagination" v-if="pages > 1 && pages < 7" role="navigation" aria-label="pagination">
    <ul class="pagination-list">
      <li v-for="(n, index) in pages" :key="index">
        <a class="pagination-link" @click.prevent="selected(n)" :class="{'is-current': page === n}">{{ n }}</a>
      </li>
    </ul>
  </nav>
  <nav class="pagination" v-else-if="pages >= 7" role="navigation" aria-label="pagination">
    <ul class="pagination-list" v-if="page - 7 < 0">
      <li v-for="(n, index) in 7" :key="index">
        <a class="pagination-link" @click.prevent="selected(n)" :class="{'is-current': page === n}">{{ n }}</a>
      </li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li><a class="pagination-link" @click.prevent="selected(pages)">{{ pages }}</a></li>
    </ul>
    <ul class="pagination-list" v-else-if="page + 6 > pages">
      <li><a class="pagination-link" @click.prevent="selected(1)">1</a></li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li v-for="(n, index) in reverseKeys(7)" :key="index">
        <a class="pagination-link" @click.prevent="selected(pages - n)" :class="{'is-current': page === pages - n}">
          {{ pages - n }}
        </a>
      </li>
    </ul>
    <ul class="pagination-list" v-else>
      <li><a class="pagination-link" @click.prevent="selected(1)">1</a></li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li><a class="pagination-link" @click.prevent="selected(page - 1)">{{ page - 1 }}</a></li>
      <li><a class="pagination-link is-current">{{ page }}</a></li>
      <li><a class="pagination-link" @click.prevent="selected(page + 1)">{{ page + 1 }}</a></li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li><a class="pagination-link" @click.prevent="selected(pages)">{{ pages }}</a></li>
    </ul>
  </nav>

</template>

<script>
export default {
  name: "PaginationComponent",
  props: {
    pages: null,
    page: null
  },
  methods: {
    reverseKeys(n) {
      return [...Array(n).keys()].slice().reverse()
    },
    selected: function (n) {
      this.$emit('selected', n)
    }
  }
}
</script>

<style scoped>

</style>
