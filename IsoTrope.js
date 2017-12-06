var mainComp = app.project.activeItem,  											// get the selected layer
	layerIndex = mainComp.selectedLayers[0].index,   								// grab index of selected layer
	layer = mainComp.layer(layerIndex),
 	isoWidth = 50,
	isoDist = Math.tan(degreesToRadians(30)) * isoWidth,
	newValues
	;

newValues = descritizeVerts(layer.property("Transform").property("Position").valueAtTime(mainComp.time, true), isoDist, isoWidth);

layer.property("Transform").property("Position").setValueAtTime(mainComp.time, newValues);

function descritizeVerts(verts, _isoDist, _isoWidth)
{
	var discreteVert = [ ];
	_isoWidth = _isoWidth/ 4;
	_isoDist = _isoDist / 4;

	var discreteVert = [ verts[0], verts[1] ]

	if ((discreteVert[0] % (_isoWidth)) > _isoWidth / 2)
	{
		discreteVert[0] = discreteVert[0] - (discreteVert[0] % (_isoWidth)) + (_isoWidth);
	}
	else if ((discreteVert[0] % (_isoWidth)) < _isoWidth / 2)
	{
		discreteVert[0] = verts[0] - (verts[0] % (_isoWidth));
	}
	
	// absolute value goes in both directions for point
	// 

	if ((discreteVert[1] % (_isoDist)) > _isoDist / 2)
	{
		discreteVert[1] = discreteVert[1] - (discreteVert[1] % (_isoDist)) + (_isoDist);
	}
	else if ((discreteVert[1] % (_isoDist)) < _isoDist / 2)
	{
		discreteVert[1] = verts[1] - (verts[1] % (_isoDist));
	}


	return discreteVert;
}
