<template>
    <div style="padding:20px;">
        <v-viewer :viewer-list="viewerData"></v-viewer>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                viewerData: [
                    {
                        fileName: "柯基犬.jpeg",
                        filePath:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501388665141&di=39690311e5f9a0c4cbe6f69a8bfa57af&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201510%2F27%2F20151027185454_wVz3i.jpeg",
                        fileType:"JPEG",
                        isImage:true,
                        isPDF:false
                    },
                    {
                        fileName:"download_SalaryCertificate201703241123414010.pdf",
                        filePath:"https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf",
                        fileType:"PDF",
                        isImage:false,
                        isPDF:true
                    }
                ]
            }
        }
    }
</script>
<style>
    
</style>