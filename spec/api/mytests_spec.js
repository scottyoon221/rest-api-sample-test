var frisby = require('frisby');
// requires to setup json-server as local REST API server
var root = 'http://localhost:3000';
/*
 * Test Case 1
 */
frisby.create('Ensure we can query post with id 1')
	.get(root+'/posts')
	.expectStatus(200)
	.expectHeader('content-type', 'application/json; charset=utf-8')
	// expect all object types in an array to match below object types
	.expectJSONTypes('*', {
		userId: Number,
		id: Number,
		title: String,
		body: String
	})
	// expect one object in an array to match below object
	.expectJSON('?', {
		id: 1,
		title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
		body:  "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
})
.toss();
/*
 * Test Case 2
 */
frisby.create('Ensure we can post in the post object')
	.post(root+'/posts', {
		userId: 10,
		id: 101,
		title: "title test",
		body: "body test"
	}, {json: true})
	.after(function(err, res, body) {
		frisby.create('Ensure we have correct object after post')
			.get(root+'/posts/101')
			.expectHeader('content-type', 'application/json; charset=utf-8')
			// expect one object in an array to match below object
			.expectJSON({
				userId: 10,
				id: 101,
				title: "title test",
				body:  "body test"
			})
		.toss();
	})
.toss();
/*
 * Test Case 3
 */
frisby.create('Ensure we can delete object in the post')
	.delete(root+'/posts/100')
	.after(function(err, res, body) {
		frisby.create('Ensure we have correct object after delete')
			.get(root+'/posts/100')
			.expectJSONLength('',0)
		.toss();
	})
.toss();
/*
 * Test Case 4
 */
frisby.create('Ensure we can put by id in the post object')
	.put(root+'/posts/1', {
		userId: 1,
		id: 1,
		title: "title modified by put test",
		body: "body modified by put test"
	}, {json: true})
	.after(function(err, res, body) {
		frisby.create('Ensure we have correct object after put')
			.get(root+'/posts/1')
			.expectJSON( {
				userId: 1,
				id: 1,
				title: "title modified by put test",
				body: "body modified by put test"
			})
		.toss();
	})
.toss();
/*
 * Test Case 5
 */
frisby.create('Ensure we can patch object in the post')
	.patch(root+'/posts/2', {
		title: "title modified by patch test",
	}, {json: true})
	.after(function(err, res, body) {
		frisby.create('Ensure we have correct object after patch')
			.get(root+'/posts/2')
			.expectJSON( {
				userId: 1,
				id: 2,
				title: "title modified by patch test",
				body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
			})
		.toss();
	})
.toss();
