function countVowels(str)
{
    let vowelscount=0;
    for(let i=0;i<str.length;i++)
    {
        if(string.charAt(i)=="a"||string.charAt(i)=="e"||string.charAt(i)=="i"||string.charAt(i)=="o"||string.charAt(i)=="u")
        {
            vowelscount++;
        }
    }
    console.log(vowelscount);

}
let string="hello world premier";
countVowels(string);