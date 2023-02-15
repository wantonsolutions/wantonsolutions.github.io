#!/bin/bash
image=$1
squares=$2

if [ -z "$image" ]; then
    echo "Usage: $0 image squares"
    exit 1
fi

if [ -z "$squares" ]; then
    echo "Usage: $0 image squares"
    exit 1
fi

if [ ! -f "$image" ]; then
    echo "$image is not a file"
    exit 1
fi

width=`convert $image -print "%w"`
height=`convert $image -print "%h"`

if [ $width != $height ]; then
    echo "$image is not square"
    exit 1
fi
let "dimensions = $width / $squares"
echo $dimensions

convert -crop ${dimensions}x${dimensions} $image +repage +adjoin %d.png