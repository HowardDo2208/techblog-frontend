import React from 'react'
import TagsInput from '../components/FormElements/TagsInput/TagsInput'
import { BodyInput } from '../components/FormElements/BodyInput/BodyInput'
import ImageUpload from '../components/FormElements/ImageUpload/ImageUpload'
import Input from '../components/FormElements/Input/Input'
import { maxLengthRule, minLengthRule, requiredRule } from './inputValidationRules'

const createFormFieldConfig = (label, name, type, elementType = 'input', defaultValue = '') => {
  //return an obj representing a single input
  return {
    //render a given input
    renderInput: (handleChange, value, isValid, error, key, onCustomInputChange) => {
      if (label === 'Image' || label === 'Avatar') {
        return (
          <ImageUpload
            label={label}
            key={label}
            center
            onInput={onCustomInputChange}
            file={value}
          />
        )
      }
      if (label === 'Body') {
        return <BodyInput key="Body" value={value} onChange={onCustomInputChange} />
      }
      if (label === 'Tags') {
        return <TagsInput key="Tags" label={label} tags={value} onChange={onCustomInputChange} />
      }

      return (
        <>
          <Input
            key={label}
            name={name}
            type={type}
            label={label}
            elementType={elementType}
            isValid={isValid}
            value={value}
            handleChange={handleChange}
            // handleBlur={handleBlur}
            errorMessage={error}
          />
        </>
      )
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: '',
    touched: false
  }
}

export const newPostForm = {
  title: {
    ...createFormFieldConfig('Title', 'title', 'text'),
    validationRules: [requiredRule('title')]
  },
  image: {
    ...createFormFieldConfig('Image', 'image', 'file'),
    validationRules: [requiredRule('image')]
  },
  body: {
    ...createFormFieldConfig('Body', 'body', 'text'),
    validationRules: [requiredRule('Body')]
  },
  tags: {
    ...createFormFieldConfig('Tags', 'tags', 'text'),
    validationRules: [requiredRule('Tags')]
  }
}

export let editPostForm = {
  title: {
    ...createFormFieldConfig('Title', 'title', 'text'),
    validationRules: [requiredRule('title')]
  },
  image: {
    ...createFormFieldConfig('Image', 'image', 'file'),
    validationRules: [requiredRule('image')]
  },
  body: {
    ...createFormFieldConfig('Body', 'body', 'text'),
    validationRules: [requiredRule('Body')]
  },
  tags: {
    ...createFormFieldConfig('Tags', 'tags', 'text'),
    validationRules: [requiredRule('Tags')]
  }
}

export let editProfileForm = {
  name: {
    ...createFormFieldConfig('Name', 'name', 'text'),
    validationRules: [requiredRule('name')]
  },
  avatar: {
    ...createFormFieldConfig('Avatar', 'avatar', 'file'),
    validationRules: [requiredRule('avatar')]
  },
  bio: {
    ...createFormFieldConfig('Bio', 'bio', 'text'),
    validationRules: [requiredRule('bio')]
  },
  links: {
    ...createFormFieldConfig('Social Links', 'links', 'text'),
    validationRules: [requiredRule('links')]
  },
  location: {
    ...createFormFieldConfig('Location', 'location', 'text'),
    validationRules: [requiredRule('location')]
  },
  work: {
    ...createFormFieldConfig('Work', 'work', 'text'),
    validationRules: [requiredRule('work')]
  },
  skills: {
    ...createFormFieldConfig('Skills', 'skills', 'text'),
    validationRules: [requiredRule('skills')]
  }
}

export const prefillEditPostForm = (data) => {
  for (let [key, value] of Object.entries(data)) {
    if (key in editPostForm) {
      if (key === 'tags') {
        let tags = []
        data[key].forEach((tag) => {
          tags.push(tag.name)
        })
        editPostForm = {
          ...editPostForm,
          [key]: { ...editPostForm[key], value: tags, valid: true }
        }
      } else {
        editPostForm = {
          ...editPostForm,
          [key]: { ...editPostForm[key], value, valid: true }
        }
      }
    }
  }
}

export const prefillEditProfileForm = (data) => {
  for (let [key, value] of Object.entries(data)) {
    if (key in editProfileForm) {
      editProfileForm = {
        ...editProfileForm,
        [key]: { ...editProfileForm[key], value, valid: true }
      }
    }
  }
}
