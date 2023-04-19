const canv = require('canvas'),
	canvas = canv.createCanvas(1018, 468),
	ctx = canvas.getContext('2d')

module.exports = class WelcomeCard {
	constructor() {
		this.font = 'DEFAULT'
	}

	setBackground(value){
		this.background = value
		return this
	}

	setCircleColor(value){
		this.circlecolor = value
		return this
	}

	setMemberIcon(value){
		this.membericon = value
		return this
	}

	setFont(value){
		this.font = value
		return this
	}

	setTitle(value){
		this.title = value
		return this
	}

	setDescription(value){
		this.description = value
		return this
	}

	async render(){
    if(!this.membericon) throw new Error('Debes colocar la URL del icono del miembro')
    if(!this.title) throw new Error('La bienvenida debe tener al menos el título')

	this.title = this.title.toUpperCase()
	if(this.description) this.description = this.description.toUpperCase()

    if(this.background){
        if(typeof this.background !== 'string') throw new Error('El fondo de la imagen debe ser un string')
    }
	if(this.circlecolor){
		if(typeof this.circlecolor !== 'string') throw new Error('El color del circulo debe ser un string')
	}
	if(this.font){
		if(typeof this.font !== 'string') throw new Error('La fuente de la imagen debe ser un string')
		this.font = this.font.toUpperCase()
		const Fonts = require('./fonts/fonts')
		const fonts = Fonts.map(x => x.name).join(', ')
		const Font = Fonts.find(x => x.name === this.font)
		if(!Font) throw new Error(`La fuente que has introducido no está disponible, las fuentes disponibles actualmente son: ${fonts}`)
	}

    if(typeof this.membericon !== 'string') throw new Error('El icono del miembro debe ser un string')
    if(typeof this.title !== 'string') throw new Error('El título de la bienvenida debe ser un string')
    if(this.description){
        if(typeof this.description !== 'string') throw new Error('La descripción de la bienvenida debe ser un string')
    }

	if(this.background){
		const bg = await canv.loadImage(this.background)
		ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
	}

	let text = this.title
	if(text.length >= 38){
	text = text.slice(0, 37) + " ..."
		}

		ctx.font = `40px ${this.font}`
		ctx.textAlign = 'center'
		ctx.fillStyle = '#ffffff'
		ctx.fillText(text, 509, 340)

	if(this.description){
		let text2 = this.description
		if(text2.length >= 52){
		text2 = text2.slice(0, 51) + " ..."
			}
		ctx.font = `28px ${this.font}`
		ctx.textAlign = 'center'
		ctx.fillStyle = '#DCDCDC'
		ctx.fillText(text2, 509, 380)
			}

	if(this.circlecolor){
		ctx.beginPath()
		ctx.arc(509, 170, 120, 0, Math.PI * 2)
		ctx.closePath()
		ctx.clip()

		ctx.beginPath()
		ctx.fillStyle = this.circlecolor
		ctx.fillRect(0, 0, canvas.width, canvas.height)
	}

	ctx.beginPath()
	ctx.arc(509, 170, 115, 0, Math.PI * 2)
	ctx.closePath()
	ctx.clip()

	await canv.loadImage(this.membericon).then(avt => {
		ctx.drawImage(avt, 367, 35, 265, 265)
	})

	return canvas.toBuffer()
	}

}