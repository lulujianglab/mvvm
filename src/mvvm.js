var element = document.getElementById('element')

// 存放data数据
var _model = {
  name: 'zhangshan',
  password: '1q2w3e4r'
}

var key = 'v-model'

var model = mvvm(element, _model)

function mvvm(element, _model) {
  var model = {}

  for (let key in _model) {
	// 使用Object.defineProperty定义新属性或修改原有的属性
	Object.defineProperty(model, key, { // 将key属性转换为访问器属性，get/set用来更新和设置数据
		
	  get () {
		return _model[key]
	  },

	  set (val) {
		if (val === _model[key]) {
		  return
		} else {
		  _model[key] = val
		  modelView()
		}
	  }

	})
  }

  modelView()

  element.addEventListener('keyup', function (e) {
	var el = e.target
	if (el.getAttribute(key)) { // model目标对象，进行依赖收集
	  model[el.getAttribute(key)] = el.value
	}
  })

  function modelView () {
	var children = element.children
	for (var i = 0; i < children.length; i++) {
	  var el = children[i]

	  if (el.getAttribute(key)) {
		el.value = model[el.getAttribute(key)]
	  }
	}
  }

  return model
}
