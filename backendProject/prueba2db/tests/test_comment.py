from rest_framework.test import APITestCase
from prueba2db.tests.test_query import QueryTest


class CommentTest(APITestCase):
    def test_create(self):
        id = QueryTest.CreateQuery(self)
        data = {
            "username": "test",
            "comment": "test"
        }
        response = self.client.post(f'/api/comment/{id}/create', data)
        self.assertEqual(response.status_code, 201)

    def test_create_fail(self):
        data = {
            "username": "test",
        }
        response = self.client.post(f'/api/comment/{123}/create', data)
        self.assertEqual(response.status_code, 500)
        self.assertEqual(
            response.data, 'Error: Query matching query does not exist.')

    def CreateComment(self, id):
        data = {
            "username": "test",
            "comment": "test"
        }
        response = self.client.post(f'/api/comment/{id}/create', data)
        return response.data['data']['id']

    def test_getAll(self):
        id = QueryTest.CreateQuery(self)
        self.CreateComment(id)
        response = self.client.get(f'/api/comment/{id}/getAll')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['data']), 1)

    def test_getAll_fail(self):
        response = self.client.get(f'/api/comment/{123}/getAll')
        self.assertEqual(response.status_code, 500)
        self.assertEqual(
            response.data, 'Error: Query matching query does not exist.')

    def test_get(self):
        id = QueryTest.CreateQuery(self)
        comment_id = self.CreateComment(id)
        response = self.client.get(f'/api/comment/get/{comment_id}')
        self.assertEqual(response.status_code, 200)

    def test_update(self):
        id = QueryTest.CreateQuery(self)
        comment_id = self.CreateComment(id)
        data = {
            "comment": "test"
        }
        response = self.client.put(f'/api/comment/update/{comment_id}', data)
        self.assertEqual(response.status_code, 200)

    def test_update_fail(self):
        data = {
            "comment": "test"
        }
        response = self.client.put(f'/api/comment/update/{123}', data)
        self.assertEqual(response.status_code, 500)
        self.assertEqual(
            response.data, 'Error: Comment matching query does not exist.')

    def test_delete(self):
        id = QueryTest.CreateQuery(self)
        comment_id = self.CreateComment(id)
        response = self.client.delete(f'/api/comment/delete/{comment_id}')
        self.assertEqual(response.status_code, 200)

    def test_delete_fail(self):
        response = self.client.delete(f'/api/comment/delete/{123}')
        self.assertEqual(response.status_code, 500)
        self.assertEqual(
            response.data, 'Error: Comment matching query does not exist.')
