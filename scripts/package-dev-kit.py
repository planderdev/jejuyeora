"""Package the editable docs and mobile UI kit without hosting credentials."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parent.parent
target = root / 'dist' / 'jejuyeora-dev-kit.zip'
files = [root / 'README.md', root / 'package.json']
files += list((root / 'scripts').glob('*'))
files += [p for p in (root / 'dist').rglob('*') if p.is_file() and p.suffix != '.zip']
with ZipFile(target, 'w', ZIP_DEFLATED, compresslevel=6) as archive:
    for path in sorted(files):
        if path.is_file():
            archive.write(path, Path('jejuyeora-design-system') / path.relative_to(root))
with ZipFile(target) as archive:
    assert archive.testzip() is None
print(f'{target}: {target.stat().st_size:,} bytes; {len(files)} files')
