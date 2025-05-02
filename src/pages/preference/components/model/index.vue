<script setup lang="ts">
import type { UploadProps } from 'ant-design-vue'
import { Button, Card, Empty, Flex, Modal, Spin, Upload, message } from 'ant-design-vue'
import { ExclamationCircleOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import ProList from '@/components/pro-list/index.vue'
import ProListItem from '@/components/pro-list-item/index.vue'
import { useModelStore } from '@/stores/model'
import { useCatStore } from '@/stores/cat'

const modelStore = useModelStore()
const catStore = useCatStore()
const { t } = useI18n()

// State untuk menambahkan model baru
const modalVisible = ref(false)
const newModelForm = ref({
  name: '',
  author: '',
  description: '',
  preview: '',
  path: ''
})

// State untuk konfirmasi penghapusan
const deleteConfirmVisible = ref(false)
const modelToDelete = ref('')

// Model yang dipilih saat ini
const selectedModel = computed(() => {
  return modelStore.selectedModel
})

// Handler untuk memilih model
const handleSelectModel = (modelId: string) => {
  if (modelStore.selectModel(modelId)) {
    // Jika model standar atau keyboard, update catStore.mode
    if (modelId === 'standard' || modelId === 'keyboard') {
      catStore.mode = modelId
    }
    message.success(t('model.selectedSuccess'))
  }
}

// Handler untuk menambahkan model baru
const handleAddModel = () => {
  if (!newModelForm.value.name || !newModelForm.value.author) {
    message.error(t('model.formError'))
    return
  }
  
  modelStore.addCustomModel({
    name: newModelForm.value.name,
    author: newModelForm.value.author,
    description: newModelForm.value.description,
    preview: newModelForm.value.preview || '/images/model-previews/default.png',
    path: newModelForm.value.path || ''
  })
  
  modalVisible.value = false
  newModelForm.value = {
    name: '',
    author: '',
    description: '',
    preview: '',
    path: ''
  }
  message.success(t('model.addSuccess'))
}

// Handler untuk menghapus model
const showDeleteConfirm = (modelId: string) => {
  modelToDelete.value = modelId
  deleteConfirmVisible.value = true
}

const handleDeleteModel = () => {
  if (modelStore.removeCustomModel(modelToDelete.value)) {
    message.success(t('model.deleteSuccess'))
  } else {
    message.error(t('model.deleteError'))
  }
  deleteConfirmVisible.value = false
}

// Handler untuk upload
const handleUpload: UploadProps['customRequest'] = ({ file, onSuccess, onError }) => {
  // Simulasi upload - dalam implementasi lengkap, upload file ke lokasi model
  setTimeout(() => {
    onSuccess?.(file)
    message.success(t('model.uploadSuccess'))
  }, 1500)
}
</script>

<template>
  <Spin :spinning="modelStore.isLoading">
    <ProList :title="t('model.management')">
      <div class="model-list">
        <div v-if="modelStore.availableModels.length === 0" class="model-empty">
          <Empty :description="t('model.noModelFound')" />
        </div>
        
        <div v-else class="model-grid">
          <Card 
            v-for="model in modelStore.availableModels" 
            :key="model.id"
            class="model-card"
            :class="{ 'selected': model.id === modelStore.selectedModelId }" 
            hoverable
            @click="handleSelectModel(model.id)"
          >
            <template #cover>
              <div class="model-preview">
                <img :src="model.preview" :alt="model.name" />
              </div>
            </template>
            <Card.Meta :title="model.name" />
            <div class="model-info">
              <p>{{ t('model.author') }}: {{ model.author }}</p>
              <p v-if="model.description">{{ model.description }}</p>
            </div>
            <div class="model-actions" @click.stop>
              <Button 
                v-if="!model.isDefault" 
                type="text" 
                danger 
                icon="DeleteOutlined"
                @click="showDeleteConfirm(model.id)"
              >
                <template #icon>
                  <DeleteOutlined />
                </template>
                {{ t('model.removeModel') }}
              </Button>
            </div>
          </Card>
          
          <!-- Card untuk menambah model baru -->
          <Card class="model-card add-model" hoverable @click="modalVisible = true">
            <div class="add-model-content">
              <PlusOutlined class="add-icon" />
              <p>{{ t('model.addModel') }}</p>
            </div>
          </Card>
        </div>
      </div>
    </ProList>
    
    <ProList v-if="selectedModel" :title="t('model.modelInfo')">
      <ProListItem :title="t('model.selected')">
        <span>{{ selectedModel.name }}</span>
      </ProListItem>
      <ProListItem :title="t('model.author')">
        <span>{{ selectedModel.author }}</span>
      </ProListItem>
      <ProListItem v-if="selectedModel.description" :title="t('model.description')">
        <span>{{ selectedModel.description }}</span>
      </ProListItem>
    </ProList>
  </Spin>
  
  <!-- Modal untuk menambah model -->
  <Modal
    v-model:open="modalVisible"
    :title="t('model.addModel')"
    @ok="handleAddModel"
  >
    <Flex vertical gap="middle">
      <ProListItem :title="t('model.modelName')" vertical>
        <input
          v-model="newModelForm.name"
          class="ant-input"
          :placeholder="t('model.modelNamePlaceholder')"
        />
      </ProListItem>
      
      <ProListItem :title="t('model.author')" vertical>
        <input
          v-model="newModelForm.author"
          class="ant-input"
          :placeholder="t('model.authorPlaceholder')"
        />
      </ProListItem>
      
      <ProListItem :title="t('model.description')" vertical>
        <textarea
          v-model="newModelForm.description"
          class="ant-input"
          :placeholder="t('model.descriptionPlaceholder')"
          rows="3"
        />
      </ProListItem>
      
      <ProListItem :title="t('model.preview')" vertical>
        <Upload
          name="file"
          :customRequest="handleUpload"
          list-type="picture-card"
          :showUploadList="false"
        >
          <div class="upload-button">
            <PlusOutlined />
            <div class="ant-upload-text">{{ t('model.uploadPreview') }}</div>
          </div>
        </Upload>
      </ProListItem>
      
      <ProListItem :title="t('model.modelFiles')" vertical>
        <Upload
          name="files"
          :customRequest="handleUpload"
          :showUploadList="true"
        >
          <Button>{{ t('model.uploadFiles') }}</Button>
        </Upload>
      </ProListItem>
    </Flex>
  </Modal>
  
  <!-- Modal konfirmasi hapus -->
  <Modal
    v-model:open="deleteConfirmVisible"
    :title="t('model.confirmDelete')"
    @ok="handleDeleteModel"
    @cancel="deleteConfirmVisible = false"
  >
    <Flex align="center" gap="small">
      <ExclamationCircleOutlined class="warning-icon" />
      <span>{{ t('model.deleteWarning') }}</span>
    </Flex>
  </Modal>
</template>

<style scoped lang="scss">
.model-list {
  margin-bottom: 20px;
}

.model-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.model-card {
  position: relative;
  transition: all 0.3s;
  border: 2px solid transparent;
  
  &.selected {
    border-color: #1890ff;
  }
}

.model-preview {
  height: 120px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}

.model-info {
  margin-top: 8px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}

.model-actions {
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
}

.add-model {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  
  .add-model-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;
  }
  
  .add-icon {
    font-size: 24px;
    margin-bottom: 8px;
  }
}

.upload-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.warning-icon {
  font-size: 22px;
  color: #faad14;
}
</style>
