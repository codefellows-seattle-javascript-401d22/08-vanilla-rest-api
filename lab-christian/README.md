## Lab 8: Vanilla API

## HTTP methods

* The user can interact with cats in 3 ways.

When this route is hit with a valid ID, the corresponding cat object will be returned.
```
http:3000/api/cat?id=${cat.id}
```

When this route is hit, a new cat can be instansiated.
```
http:3000/api/cat
```

When this route is hit with a valid ID, the corresponding cat object will be deleted from the storage module. 
```
http:3000/api/cat?=${cat.id}
```
