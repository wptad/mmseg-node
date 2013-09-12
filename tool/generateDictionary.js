var fs = require('fs');
var readline = require('readline');
var stream = require('stream');


if(process.argv.length!=5){
	console.log('   HELP: ')
	console.log('     node generateDictionary.js filePath spliter index')
	return;
}else
	console.log('Start to read File..... please wait');

var filePath= process.argv[2];
var spliter= process.argv[3];
var index= +process.argv[4];

var instream = fs.createReadStream(filePath);
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

var keywordsMap= {};
rl.on('line', function(line) {

	if(line)
	{
		var kw= line.split('\t')[index];
		if(kw)
			keywordsMap[kw]=1;
	}
});

//.trim()+'\t1\nx:1\n'
rl.on('close', function() {
	var keywords= [];
	for(var key in keywordsMap)
		keywords.push(key.trim()+'\t1\nx:1\n');

	console.log('saving data...');
	fs.writeFile('../dict/unigram.txt',keywords.join(''),function(err,result){
		console.log('finished, dictionary saved in dict/unigram.txt');
	})
});
