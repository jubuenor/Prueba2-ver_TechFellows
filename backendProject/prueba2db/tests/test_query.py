from rest_framework.test import APITestCase


class QueryTest(APITestCase):
    def CreateQuery(self):
        data = {
            "username": "test",
            "title": "test",
            "query": "test",
            "description": "test"
        }
        response = self.client.post('/api/query/create', data)
        return response.data['data']['id']

    def test_create(self):
        data = {
            "username": "test",
            "title": "test",
            "query": "test",
            "description": "test"
        }
        response = self.client.post('/api/query/create', data)
        self.assertEqual(response.status_code, 201)

    def test_getAll(self):
        self.CreateQuery()
        response = self.client.get('/api/query/getAll')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['data']), 1)

    def test_get(self):
        id = self.CreateQuery()
        response = self.client.get('/api/query/get/' + str(id))
        self.assertEqual(response.status_code, 200)

    def test_update(self):
        id = self.CreateQuery()
        data = {
            "title": "test",
            "query": "test",
            "description": "test"
        }
        response = self.client.put('/api/query/update/'+str(id), data)
        self.assertEqual(response.status_code, 200)

    def test_delete(self):
        id = self.CreateQuery()
        response = self.client.delete('/api/query/delete/'+str(id))
        self.assertEqual(response.status_code, 200)
