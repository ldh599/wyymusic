<template>
    <div>
        <left></left>
        <right></right>
        
    </div>
</template>

<script>
import left from './main_left/mainLeft'
import right from './main_right/mainRight'
export default {
    name:'vmain',
    components:{
        left,
        right
    }
}
</script>