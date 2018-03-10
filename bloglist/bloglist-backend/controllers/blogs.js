const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog
            .find({ })
            .populate('user', { name: 1, username: 1, _id: 1 })
            .populate('comments', { content: 1, _id: 1 })

        response.status(200).json(blogs.map(Blog.format))
    } catch (exception) {
        console.log(exception)
        response.status(500).send({ error: 'Something went wrong..' })
    }
})

blogsRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        const token = request.token
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return response.status(401).send({ error: 'Token missing or invalid' })
        }

        if (body.title === undefined || body.title === null || body.title.length === 0) {
            return response.status(400).send({
                error: `Title must be defined. Title: ${body.title}`
            })
        }

        if (body.url === undefined || body.url === null || body.url.length === 0) {
            return response.status(400).send({
                error: `URL must be defined. URL: ${body.url}`
            })
        }

        let likes = body.likes
        if (likes === undefined) {
            likes = 0
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: likes,
            user: user._id,
            comments: []
        })

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

		await savedBlog.populate('user', { name: 1, username: 1, _id: 1 }).execPopulate()

        response.status(201).json(Blog.format(savedBlog))
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).send({ error: exception.message })
        } else {
            console.log(exception)
            response.status(500).send({ error: 'Something went wrong.. ' })
        }
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        const toBeRemoved = await Blog.findById(request.params.id)

        if (toBeRemoved === null || toBeRemoved === undefined) {
            return response.status(400).send({ error: `Malformatted id: ${request.params.id}` })
        }

        if (toBeRemoved.user !== undefined && toBeRemoved.user !== null) {
            const decodedToken = jwt.verify(request.token, process.env.SECRET)

            if (decodedToken.id.toString() !== toBeRemoved.user.toString()) {
                return response.status(401).send({ error: 'Operation not authorised' })
            }
        }

        await toBeRemoved.remove()

        response.status(204).end()
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).send({ error: exception.message })
        } else {
            console.log(exception)
            response.status(500).send({ error: 'Something went wrong.. ' })
        }
    }
})

blogsRouter.put('/:id', async (request, response) => {
    try {
        const updatedBlog = {
            author: request.body.author,
            title: request.body.title,
            url: request.body.url,
            likes: request.body.likes
        }
        const options = { new: true }
        const newBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, options)

        if (newBlog === null || newBlog === undefined) {
            return response.status(400).send({ error: `Malformatted id: ${request.params.id}` })
        }

        response.status(200).json(newBlog)
    } catch (exception) {
        console.log(exception)
        response.status(500).send({ error: 'Something went wrong..' })
    }
})

blogsRouter.get('/:id/comments', async (request, response) => {
    try {
        const comments = await Comment.find({ blog: request.params.id })

        response.status(200).json(comments.map(Comment.format))
    } catch (exception) {
        console.log(exception)
        response.status(500).send({ error: 'Something went wrong..' })
    }
})

blogsRouter.post('/:id/comments', async (request, response) => {
    try {
        const content = request.body.content

        if (content === null || content === undefined || content.length === 0) {
            return response.status(400).send({ error: 'Content of comment must be defined' })
        }

        const blog = await Blog.findById(request.params.id)

        const comment = new Comment({
            content: request.body.content,
            blog: blog._id
        })

        await comment.save()

        blog.comments = blog.comments.concat(comment._id)

        await blog.save()
        response.status(201).json(Comment.format(comment))
    } catch (exception) {
        console.log(exception)
        response.status(500).send({ error: 'Something went wrong..' })
    }
})

module.exports = blogsRouter