#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const read = require('read')
const clipboardy = require('clipboardy')
require('colors')

const isWin = process.platform === 'win32'
const spliter = isWin ? ',\n  ' : ',\n  '
const engFilePath = './src/lang/en.js'
const chnFilePath = './src/lang/cn.js'
const fileCharset = 'utf8'

let chnWordTop = ''
const tf = (str) => {
  const arr = str.split(' ')
  for (let i = 1; i < arr.length; i += 1) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1)
  }
  return arr.join('')
}
const langCreater = {
  projectRoot: path.resolve(__dirname, '../'),
  renderYesNo: (data) => {
    if (data === 'yes') { return true } else if (data === 'no') { return false }
    return data
  },
  errorHander: (error) => { // 错误处理
    if (error) {
      if (error.message === 'canceled') {
        console.log('\n\n您已取消该操作!'.yellow)
        process.exit(0)
      } else if (error.message === 'timed out') {
        console.log('等待已超时, 请重新输入!'.yellow)
        process.exit(0)
      } else {
        throw error
      }
    }
  },
  modifyFile(langFilePath, engWord, result) {
    fs.readFile(path.join(langFilePath), fileCharset, (err, data) => {
      if (err) throw err
      let dataTemp = data
      dataTemp = dataTemp.split(spliter)
      dataTemp.splice(1, 0, `${engWord}: '${result}'`)
      dataTemp = dataTemp.join(spliter)
      fs.writeFile(langFilePath, dataTemp, fileCharset, (errWrite) => {
        if (errWrite) throw errWrite
        // console.log((`更新${type}${'成功'}`).green);
      })
    })
  },
  typeEnglishVersion(chnWord, prompt) {
    read({
      prompt: prompt || '请输入对应英文翻译，多个单词以空格分割: ',
      timeout: 120000
    }, (error, result) => {
      if (result === '') {
        langCreater.typeChineseVersion(chnWordTop, '亲，你还没输入英文翻译呢: ')
      } else {
        langCreater.errorHander(error)
        langCreater.modifyFile(chnFilePath, tf(result), chnWord, 'cn')// 更新中文文件
        langCreater.modifyFile(engFilePath, tf(result), result, 'en')// 更新英文文件
        setTimeout(() => {
          clipboardy.writeSync(`$t('${tf(result)}')`)
          console.log((`已复制$t('${tf(result)}')至剪贴板`).green)
          langCreater.ifCreateDir('可以继续输入中文单词哦: ')
        }, 0)
      }
    })
  },
  ifTheWordExist(word) {
    fs.readFile(path.join(chnFilePath), fileCharset, (err, data) => {
      if (err) throw err
      let dataTemp = data
      dataTemp = dataTemp.split(spliter)
      // 已存在的单词
      if (dataTemp.some(item => `'${word}'` === item.split(':')[1].replace(/\s+/g, ''))) {
        dataTemp.forEach((item, index) => {
          if (`'${word}'` === item.split(':')[1].replace(/\s+/g, '')) {
            clipboardy.writeSync(`$t('${tf(item.split(':')[0])}')`)
            console.log((`已存在的单词，在cn.js第${index + 1}行，不过我已经帮您复制$t('${tf(item.split(':')[0])}')到剪贴板啦！`).green)
            langCreater.ifCreateDir('可以继续输入中文单词哦: ')
          }
        })
      } else {
        langCreater.typeEnglishVersion(word, undefined)
        chnWordTop = word
      }
    })
  },
  ifCreateDir: (prompt) => { // 询问创建文件夹
    read({
      prompt: prompt || '请输入新增中文单词: ',
      timeout: 120000
    }, (error, result) => {
      langCreater.errorHander(error)
      if (result === '') {
        langCreater.ifCreateDir('亲，你还没输入中文单词呢: ')
      } else {
        langCreater.ifTheWordExist(result)
      }
    })
  }
}
console.log(('Hi,我是您的翻译小助理-粥洁纶，可以帮你快速整理翻译哦！').yellow)
langCreater.ifCreateDir()
