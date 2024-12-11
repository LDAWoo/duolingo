"use client";
import React from "react";

type ModelProps = {
    width?: number;
    height?: number;
    styles: {
        BackgroundColor: string;
        SkinTone: string;
        ClothingColor: string;
        HairColor: string;
        EyeColor: string;
        MouthShape: string;
    };
    onCapture?: () => void;
};

const Model = ({ width, height, styles, onCapture }: ModelProps) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (canvas && ctx && width && height && styles) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const drawRoundedRect = (x: number, y: number, width: number, height: number, radius: number, color: string) => {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width - radius, y);
                ctx.arcTo(x + width, y, x + width, y + radius, radius);
                ctx.lineTo(x + width, y + height - radius);
                ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
                ctx.lineTo(x + radius, y + height);
                ctx.arcTo(x, y + height, x, y + height - radius, radius);
                ctx.lineTo(x, y + radius);
                ctx.arcTo(x, y, x + radius, y, radius);
                ctx.closePath();
                ctx.fill();
            };

            // Utility function to draw a circle
            const drawCircle = (x: number, y: number, radius: number, color: string) => {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            };

            // Draw head with rounded corners
            const headWidth = 260; // 260 70
            const headHeight = 230; // 230 60
            const headX = canvas.width * 0.5 - headWidth / 2;
            const headY = canvas.height * 0.05;
            const borderRadius = headWidth * 0.23;
            ctx.lineCap = "round";

            ctx.fillStyle = styles.BackgroundColor;
            ctx.fillRect(0, 0, width, height); // Fill background

            drawRoundedRect(headX, headY, headWidth, headHeight, borderRadius, styles.SkinTone);

            const earRadius = headWidth * 0.14;
            // Draw ears
            drawCircle(headX - 5, headY + headHeight * 0.4, earRadius, styles.SkinTone);
            drawCircle(headX + headWidth + 5, headY + headHeight * 0.4, earRadius, styles.SkinTone);

            // Draw eyes
            const eyeWidth = headWidth * 0.25;
            const eyeHeight = headHeight * 0.35;
            const eyeRadius = eyeWidth * 0.5;
            const eyeY = headY + headHeight * 0.2;
            const pupilWidth = eyeWidth * 0.4;
            const pupilHeight = eyeHeight * 0.5;

            const drawEye = (x: number) => {
                drawRoundedRect(x, eyeY, eyeWidth, eyeHeight, eyeRadius, "#FFFFFF");
                const pupilX = x + eyeWidth * 0.58 - pupilWidth / 2;
                const pupilY = eyeY + (eyeHeight - pupilHeight) / 2;
                drawRoundedRect(pupilX, pupilY, pupilWidth, pupilHeight, pupilWidth / 2, styles.EyeColor);
                drawCircle(pupilX + pupilWidth * 0.2, pupilY + pupilHeight * 0.1, pupilWidth * 0.25, "#FFFFFF");
            };

            drawEye(headX + headWidth * 0.34 - eyeWidth / 2); // Left eye
            drawEye(headX + headWidth * 0.66 - eyeWidth / 2); // Right eye

            // Draw nose
            const noseWidth = headWidth * 0.1;
            const noseHeight = headHeight * 0.2;
            const noseX = headX + headWidth * 0.5;
            const noseY = headY + headHeight * 0.5;

            ctx.fillStyle = "#4F261D";
            ctx.beginPath();
            ctx.arc(noseX, noseY + noseHeight / 2, noseWidth / 2, Math.PI, 0, true);
            ctx.closePath();
            ctx.fill();

            // Draw smile
            const drawSmile = (x1: number, y1: number, x2: number, y2: number, controlX: number, controlY: number, lineWidth: number, color: string) => {
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = color;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.quadraticCurveTo(controlX, controlY, x2, y2);
                ctx.stroke();
            };

            const smileThick = headWidth * 0.05;
            drawSmile(headX + headWidth * 0.3, headY + headHeight * 0.7, headX + headWidth * 0.5, headY + headHeight * 0.8, headX + headWidth * 0.35, headY + headHeight * 0.85, smileThick, "#4F261D");

            // Draw neck
            const neckWidth = headWidth * 0.4;
            const neckHeight = headHeight * 0.15;
            const neckX = headX + headWidth * 0.5 - neckWidth / 2;
            const neckY = headY + headHeight;

            ctx.fillStyle = styles.ClothingColor;
            ctx.fillRect(neckX, neckY, neckWidth, neckHeight);

            // Draw arms
            const armLength = headWidth * 0.8;
            ctx.strokeStyle = styles.ClothingColor;
            ctx.lineWidth = headWidth * 0.23;

            ctx.beginPath(); // Left arm
            ctx.moveTo(neckX - neckWidth * 0.28, neckY + neckHeight * 2.8);
            ctx.lineTo(neckX - armLength, neckY + neckHeight + armLength * 2);
            ctx.stroke();

            ctx.beginPath(); // Right arm
            ctx.moveTo(neckX + neckWidth + neckWidth * 0.28, neckY + neckHeight * 2.8);
            ctx.lineTo(neckX + neckWidth + armLength, neckY + neckHeight + armLength * 2);
            ctx.stroke();

            // Draw body
            const bodyWidth = headWidth * 0.84;
            const bodyHeight = headWidth * 2;
            const bodyX = headX + headWidth * 0.5 - bodyWidth / 2;
            const bodyY = headY + headHeight + neckHeight - 1;
            const bodyRadius = headWidth * 0.25;

            drawRoundedRect(bodyX, bodyY, bodyWidth, bodyHeight, bodyRadius, styles.ClothingColor);
        }
    }, [canvasRef, width, height, styles]);

    const captureCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const dataURL = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = dataURL;
            link.download = "canvas-image.png";
            link.click();
        }
    };

    return <canvas ref={canvasRef} width={width} height={height} />;
};

export default React.memo(Model);
