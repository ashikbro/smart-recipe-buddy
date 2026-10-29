# Smart Recipe Buddy

Transparent recipe recommendations based on available ingredients, dietary
preferences, and calorie limits.

## Current status

The repository includes a deterministic recommendation core. It does not make
medical or nutritional diagnoses; calorie values are user-provided recipe
metadata and should be checked against trusted nutrition sources.

## Development

```sh
python -m venv .venv
.venv/bin/pip install pytest
PYTHONPATH=src .venv/bin/pytest
```
