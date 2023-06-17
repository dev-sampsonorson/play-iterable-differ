# Iterable Differs

### Improving NgFor

[Faster Angular Applications - Understanding Differs. Developing a Custom IterableDiffer](https://blog.mgechev.com/2017/11/14/angular-iterablediffer-keyvaluediffer-custom-differ-track-by-fn-performance/)  

- Use NgFor with Array and Objects
- IterableDiffer checks the whole collection ~ O(n)
- Move the "What has been changed" to the collection itself + different data structure ~ O(1)
- Inspired by Minko Gechev Blog - https://mgv.io/ng-diff

### Learnings

- What are IterableDiffs and how Angular use them to accelerate application performance
- How we can create our custom IterableDiffer and extend the IterableDiffs by using CS technics
