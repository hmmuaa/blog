///以下代码未整理 来自stackoverflow.com/a/49432189/2537458
///可能可以改成async-less版本
Array.prototype.forEachAsync = async function (fn) {
	for (let t of this) {
		await fn(t)
	}
}

Array.prototype.forEachAsyncParallel = async function (fn) {
	await Promise.all(this.map(fn))
}

await myArray.forEachAsyncParallel(async item => {
	await myAsyncFunction(item)
})


///stackoverflow.com/a/46394314/2537458
files.reduce((lastPromise, file) => 
 lastPromise.then(() => 
   fs.readFile(file, 'utf8')
 ), Promise.resolve()
)

///stackoverflow.com/a/49499491/2537458
async function printFiles () {
  const files = await getFilePaths();

  await files.reduce(async (promise, file) => {
    // This line will wait for the last async function to finish.
    // The first iteration uses an already resolved Promise
    // so, it will immediately continue.
    await promise;
    const contents = await fs.readFile(file, 'utf8');
    console.log(contents);
  }, Promise.resolve());
}