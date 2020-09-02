# Code Style

This documents helps to guide the look and feel of the code so that even when there are multiple developer, the style remains consistent. You may read more about it [here](https://javascript.info/coding-style).

## Style Guide

| Rules             | Choices                         |
| ----------------- | ------------------------------- |
| Case Styles       | camelCase                       |
| Acronym Case      | IBM                             |
| Indentation Style | 1TBS                            |
| Indentation       | Tabs                            |
| Indentation Space | 4 spaces                        |
| Semicolon         | Mandatory                       |

## Examples

Based on your chosen rules, give an example of a code that follows the code style and an example of a code that does not follow the code style. The examples you give should cover all the above defined rule.

### Good Example

```js
app.get('/basic/data', function(req,res,next) {
    const { companyId, audienceCount, page, pageSize} = req.query;
    database.getOptions(companyId, audienceCount, page, pageSize, (error, result) => {
        if (error) {
            return next(error);
        }
        res.json(result);
    });
});
```

### Bad Example

```js
app.get('/basic/data', function(req,res,next) 
{
  const { companyid, audiencecount, page, pagesize} = req.query
  database.getoptions(companyid, audiencecount, page, pagesize, (error, result) => 
  {
    if (error) 
    {
    return next(error)
    }
    res.json(result)
  })
})
```
